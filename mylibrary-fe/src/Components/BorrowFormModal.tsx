import React, {  } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, makeStyles, Theme, Typography } from '@material-ui/core';
import { Book } from '../Model/Book';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme: Theme) => ({
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  }

}))

export interface BorrowFormModalProps {
  book: Book | undefined;
  isOpen: boolean;
  onButtonClicked: (acepted: boolean) => void;
}

export const BorrowFormModal: React.FC<BorrowFormModalProps> = ({ book, isOpen, onButtonClicked }) => {

  const weekInMs = 604800000;

  const classes = useStyles();

  return <div>
    <Dialog open={isOpen} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Confirm</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Confirm book that you want to borrow.
          </DialogContentText>
        <Divider className={classes.divider} />
        <Typography variant="overline">Title</Typography>
        <Typography variant="body1">{book && book.title}</Typography>
        
        <Typography variant="overline">Author</Typography>
        <Typography variant="body1">{book && book.author}</Typography>

        <Typography variant="overline">ISBN</Typography>
        <Typography variant="body1">{book && book.isbn}</Typography>

        <Divider className={classes.divider} />

        <Alert severity="info">Remember to return this book by {new Date(Date.now() + weekInMs).toLocaleDateString()}</Alert>
        
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onButtonClicked(false)} color="primary">
          Cancel
          </Button>
        <Button onClick={() => onButtonClicked(true)} color="primary">
          Confirm
          </Button>
      </DialogActions>
    </Dialog>
  </div>

};