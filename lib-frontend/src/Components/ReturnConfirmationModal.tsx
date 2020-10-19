import React, { } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, makeStyles, Theme } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme: Theme) => ({
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  }

}))

export interface ReturnConfirmationModalProps {
  isOpen: boolean;
  onButtonClicked: (acepted: boolean) => void;
}

export const ReturnConfirmationModal: React.FC<ReturnConfirmationModalProps> = ({ isOpen, onButtonClicked }) => {

  return <div>
    <Dialog open={isOpen} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Confirm</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure that you want to return selected book?
        </DialogContentText>

        <Alert severity="info">Remember to return this book by 24h</Alert>

      </DialogContent>
      <DialogActions>
        <Button onClick={() => onButtonClicked(false)} color="primary">No</Button>
        <Button onClick={() => onButtonClicked(true)} color="primary">Yes</Button>
      </DialogActions>
    </Dialog>
  </div>

};