import React, { useEffect, useState } from 'react';
import { Box, TextField, Tooltip } from '@material-ui/core';
import { Book } from '../Model/Book';
import { BooksTable } from './BooksTable';
import { Alert } from '@material-ui/lab';
import { APP_CONFIG } from '../Config';
import { BorrowedBookControls } from './BorrowedBookControls';
import { ReturnConfirmationModal } from './ReturnConfirmationModal';

const getRequestHeader = (token: string | null) => {
    return {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + (token ? token : '')
    }
}

export interface BorrowedViewProps {
    userId: number | undefined;
}

export const BorrowedView: React.FC<BorrowedViewProps> = ({ userId }) => {

    const [books, setBooks] = useState<Book[]>([] as Book[]);

    const [selectedBook, setSelectedBook] = useState<Book | undefined>();

    const [hasErrors, setErrors] = useState<boolean>();

    const [filterPredicate, setFilterPredicate] = useState<string | null>(null);

    const [isBorrowModalOpen, setBorrowModalOpen] = useState<boolean>(false);

    const handleFilter = (event: any): void => setFilterPredicate(event.target.value);

    const booksFilter = (value: Book): boolean => {
        if (filterPredicate === null) {
            return true;
        }
        return (value.author.includes(filterPredicate) || value.title.includes(filterPredicate) || value.isbn.includes(filterPredicate))
    }

    const getBorrowedBooks = async () => {
        const res = await fetch(APP_CONFIG.endpointAddress + `/users/${userId}/borrowed`, { headers: getRequestHeader(localStorage.getItem('token')) })
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
    }

    const handleReturnBook = async () => {
        const res = await fetch(
            APP_CONFIG.endpointAddress + `/users/${userId}/return`, 
            { 
                method: 'POST',
                headers: getRequestHeader(localStorage.getItem('token')),
                body: JSON.stringify({ bookId: selectedBook?.bookId })
             })
        res
            .json()
            .then(() => {
                getBorrowedBooks();
                setBorrowModalOpen(false);
            })
           
    }

    useEffect(() => {
        getBorrowedBooks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <div>
        {
            hasErrors && <Alert severity="error" onClose={() => setErrors(false)}>Error occured!</Alert>
        }
        <Box component="div" py={3}>
            <Tooltip title="Enter title, author of isbn"><TextField id="filter-input" label="Books filter" variant="outlined" fullWidth onChange={handleFilter} /></Tooltip>
        </Box>
        <BooksTable displayMode="borrowed" booksList={books} booksFilter={booksFilter} onBookSelected={setSelectedBook} />
        <ReturnConfirmationModal isOpen={isBorrowModalOpen} onButtonClicked={handleReturnBook} />
        {selectedBook && <BorrowedBookControls onReturnButtonClicked={() => setBorrowModalOpen(true)} />}
    </div>

};