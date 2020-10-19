export type BookStatus = 'available' | 'borrowed';

export interface Book {
    bookId: number;
    title: string;
    author: string;
    year: number;
    description: string;
    isbn: string;
    pages: number;
    status: BookStatus;
    isFavourite?: boolean;
}

export interface BorrowedBook extends Book {
    borrowDate: Date;
    returnDate: Date;
}