import React, { useEffect, useState } from 'react';
import { Box, TextField, Tooltip } from '@material-ui/core';
import { Book } from '../Model/Book';
import { BooksTable } from './BooksTable';
import { Alert } from '@material-ui/lab';
import { APP_CONFIG } from '../Config';

const getRequestHeaders = (token: string | null) => {
    return {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + (token ? token : '')
    }
}

export interface FavouriteBooksViewProps {
    userId: number | undefined;
}

export const FavouriteBooksView: React.FC<FavouriteBooksViewProps> = ({ userId }) => {

    const [books, setBooks] = useState<Book[]>([] as Book[]);

    const [hasErrors, setErrors] = useState<boolean>(false);

    const [filterPredicate, setFilterPredicate] = useState<string | null>(null);

    const handleFilter = (event: any): void => setFilterPredicate(event.target.value);

    const booksFilter = (value: Book): boolean => {
        if (filterPredicate === null) {
            return true;
        }
        return (value.author.includes(filterPredicate) || value.title.includes(filterPredicate) || value.isbn.includes(filterPredicate))
    }

    const getFavouriteBooks = async () =>{
        const res = await fetch(APP_CONFIG.endpointAddress + `/users/${userId}/favourites`, { headers: getRequestHeaders(localStorage.getItem('token')) })
        res
            .json()
            .then(res => {
                console.log("response", res)
                setBooks(res)
            })
            .catch(() => setErrors(true))
    };

    useEffect(() => {
        getFavouriteBooks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <div>
        {
            hasErrors && <Alert severity="error" onClose={() => setErrors(false)}>Error occured!</Alert>
        }
        <Box component="div" py={3}>
            <Tooltip title="Enter title, author of isbn"><TextField id="filter-input" label="Books filter" variant="outlined" fullWidth onChange={handleFilter} /></Tooltip>
        </Box>
        <BooksTable displayMode="favourites" booksList={books} booksFilter={booksFilter} onBookSelected={() => {}} />
    </div>

};