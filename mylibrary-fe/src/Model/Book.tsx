export type BookStatus = 'available' | 'borrowed';

export interface Book {
    bookId: number;
    title: string;
    author: string;
    year: number;
    description: string;
    pages: number;
    isbn: string;
    status: BookStatus;
    borrowDate?: Date;
    returnDate?: Date;
    isStarred?: boolean;
}
