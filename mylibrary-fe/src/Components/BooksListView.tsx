import React, { useEffect, useState } from 'react';
import { Box, TextField, Tooltip } from '@material-ui/core';
import { Book } from '../Model/Book';
import { BooksTable } from './BooksTable';
import { BookControls } from './BookControls';
import { BorrowFormModal } from './BorrowFormModal';
import { Alert } from '@material-ui/lab';
import { APP_CONFIG } from '../Config';
import { UserRole } from '../Model/User';

const getRequestHeaders = (token: string | null) => {
    return {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + (token ? token : '')
    }
}

export interface BooksListViewProps {
    userId: number | undefined;
    userRole: UserRole | undefined;
}

export const BooksListView: React.FC<BooksListViewProps> = ({ userId, userRole }) => {

    const [books, setBooks] = useState<Book[]>([] as Book[]);

    const [selectedBook, setSelectedBook] = useState<Book | undefined>();

    const [hasErrors, setErrors] = useState<boolean>(false);

    const [filterPredicate, setFilterPredicate] = useState<string | null>(null);

    const [isBorrowModalOpen, setBorrowModalOpen] = useState<boolean>(false);

    const [bookControlsDisplayed, setBookControlsDisplayed] = useState<boolean>(false);

    const handleFilter = (event: any): void => setFilterPredicate(event.target.value);

    const booksFilter = (value: Book): boolean => {
        if (filterPredicate === null) {
            return true;
        }
        return (value.author.includes(filterPredicate) || value.title.includes(filterPredicate) || value.isbn.includes(filterPredicate))
    }

    const handleBorrowConfirmation = async (accept: boolean) => {
        if (!accept) {
            setBorrowModalOpen(false);
        } else {
            const res = await fetch(
                APP_CONFIG.endpointAddress + `/users/${userId}/borrow`,
                {
                    method: 'POST',
                    headers: getRequestHeaders(localStorage.getItem('token')),
                    body: JSON.stringify({
                        bookId: selectedBook?.bookId
                    })
                })
            res
                .json()
                .then(res => {
                    setErrors("error" in res)
                    getAllBooks();
                    setBorrowModalOpen(false);
                })
                .catch(() => setErrors(true))
        }
    };

    const getAllBooks = async () => {
        const res = await fetch(
            APP_CONFIG.endpointAddress + "/books/all",
            {
                method: 'GET',
                headers: getRequestHeaders(localStorage.getItem('token'))
            })
        res
            .json()
            .then(res => {
                if ("error" in res) {
                    setErrors(true);
                } else {
                    setErrors(false);
                    setBooks(res);
                }
            })
            .catch(() => setErrors(true))
    };

    const handleOnBookSelected = (book: Book | undefined) => {
        setSelectedBook(book)
        if (userRole === 'client') {
            setBookControlsDisplayed(typeof book !== undefined)
        }
    }

    useEffect(() => {
        getAllBooks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <Box component="div">
        {
            hasErrors && <Alert severity="error" onClose={() => setErrors(false)}>Error occured!</Alert>
        }
        <Box component="div" py={3}>
            <Tooltip title="Enter title, author or isbn"><TextField id="filter-input" label="Books filter" variant="outlined" fullWidth onChange={handleFilter} /></Tooltip>
        </Box>
        <BooksTable displayMode="search" booksList={books} booksFilter={booksFilter} onBookSelected={handleOnBookSelected} />
        <BorrowFormModal isOpen={isBorrowModalOpen} book={selectedBook} onButtonClicked={handleBorrowConfirmation} />
        {bookControlsDisplayed && <BookControls onBorrowButtonClicked={() => setBorrowModalOpen(true)} onFavouritesButtonClicked={() => { }} />}
    </Box>

};