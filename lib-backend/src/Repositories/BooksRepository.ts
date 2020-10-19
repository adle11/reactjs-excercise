import Knex from 'knex';
import { Book, BorrowedBook } from '../Models/Book';

export default (conn: Knex) => ({
  getAllBooks: (): Promise<Book[]> => conn
    .select("books.bookId", "books.title", "books.author", "books.year", "books.description", "books.isbn", "books.pages", "borrowed_books.borrowDate", "borrowed_books.returnDate")
    .from("books")
    .leftJoin("borrowed_books", "borrowed_books.bookId", "books.bookId")
    .then(rows => {
      if (!rows) return [];
      return rows;
    }),
  getBorrowedBooks: (userId: number): Promise<BorrowedBook[]> => conn
    .select("books.bookId", "books.title", "books.author", "books.year", "books.description", "books.isbn", "books.pages", "borrowed_books.borrowDate", "borrowed_books.returnDate")
    .from("borrowed_books")
    .leftJoin("books", "borrowed_books.bookId", "books.bookId")
    .where("borrowed_books.userId", "=", userId)
    .then(rows => {
      return rows;
    }),
  getFavouriteBooks: (userId: number): Promise<Book[]> => conn
    .select("books.bookId", "books.title", "books.author", "books.year", "books.description", "books.isbn", "books.pages", "borrowed_books.borrowDate", "borrowed_books.returnDate")
    .from("favourite_books")
    .leftJoin("books", "favourite_books.bookId", "books.bookId")
    .leftJoin("borrowed_books", "favourite_books.bookId", "books.bookId")
    .where("favourite_books.userId", "=", userId)
    .then(rows => {
      return rows;
    }),
  borrowBook: (userId: number, bookId: number): Promise<boolean | number[]> => {
    const borrowDate = new Date().toISOString().slice(0, 10);
    const returnDate = new Date(Date.now() + 604800000).toISOString().slice(0, 10);

    return conn
      .insert({ userId: userId, bookId: bookId, borrowDate: borrowDate, returnDate: returnDate })
      .into('borrowed_books')
      .then(results => {
        conn('books').where({ bookId: bookId }).update('status', 'borrowed')
        console.log("results: ", results)
        return results;
      })
  },
  returnBook: (userId: number, bookId: number): Promise<boolean | void | number | number[]> => {
    return conn('borrowed_books')
      .where('userId', userId)
      .andWhere('bookId', bookId)
      .delete()
      .then(results => {
        return results;
      });
  }

})