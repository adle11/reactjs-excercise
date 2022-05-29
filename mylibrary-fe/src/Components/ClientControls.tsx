import React from 'react';
import { Fab, makeStyles, Theme } from '@material-ui/core';
import { LibraryBooks, Block, MailOutline } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) => ({
  floatingButtonsContainer: {
    '& > *': {
      margin: theme.spacing(1),
    },
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}))

export interface ClientControlsProps {
  clientEmail: string | undefined;
  onBorrowedBooksClicked: () => void;
  onSuspendClicked: () => void; 
}

export const ClientControls: React.FC<ClientControlsProps> = ({ clientEmail, onBorrowedBooksClicked, onSuspendClicked }) => {

  const classes = useStyles();

  return <div className={classes.floatingButtonsContainer}>
    <Fab color="primary" aria-label="borrow" variant="extended" onClick={onBorrowedBooksClicked}>
      <LibraryBooks className={classes.extendedIcon} /> Borrowed Books
    </Fab>
    <Fab color="primary" aria-label="star" variant="extended" href={"mailto:" + clientEmail}>
      <MailOutline className={classes.extendedIcon} /> Contact
    </Fab>
    <Fab color="primary" aria-label="star" variant="extended" onClick={onSuspendClicked}>
      <Block className={classes.extendedIcon} /> Suspend
    </Fab>
  </div>
}