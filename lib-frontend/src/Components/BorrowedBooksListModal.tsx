import React, { } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme } from '@material-ui/core';
import { Book } from '../Model/Book';
import { Client } from '../Model/User';

const useStyles = makeStyles((theme: Theme) => ({
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  table: {
    // minWidth: 650,
  }

}))

export interface BorrowedBooksListModalProps {
  isOpen: boolean;
  client: Client | undefined;
  borrowedBooks: Book[] | undefined;
  onButtonClicked: (acepted: boolean) => void;
}

export const BorrowedBooksListModal: React.FC<BorrowedBooksListModalProps> = ({ isOpen, client, borrowedBooks, onButtonClicked }) => {

  const classes = useStyles();

  return <div>
    <Dialog open={isOpen} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Borrowed books</DialogTitle>
      <DialogContent>
        <DialogContentText>
          List of books borrowed by {client?.name} {client?.surname}.
        </DialogContentText>

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="center">Author</TableCell>
                <TableCell align="center">ISBN</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {borrowedBooks?.map((book) => (
                <TableRow key={book.isbn}>
                  <TableCell component="th" scope="row">
                    {book.title}
                  </TableCell>
                  <TableCell align="center">{book.author}</TableCell>
                  <TableCell align="center">{book.isbn}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      </DialogContent>
      <DialogActions>
        <Button onClick={() => onButtonClicked(true)} color="primary">
          Close
          </Button>
      </DialogActions>
    </Dialog>
  </div>

};