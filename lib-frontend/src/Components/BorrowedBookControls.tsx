import React from 'react';
import { Fab, makeStyles, Theme } from '@material-ui/core';
import { KeyboardReturn } from '@material-ui/icons';

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

export interface BorrowedBookControlsProps {
  onReturnButtonClicked: () => void;
}

export const BorrowedBookControls: React.FC<BorrowedBookControlsProps> = ({ onReturnButtonClicked }) => {

  const classes = useStyles();

  return <div className={classes.floatingButtonsContainer}>
    <Fab color="primary" aria-label="borrow" variant="extended" onClick={onReturnButtonClicked}>
      <KeyboardReturn className={classes.extendedIcon} /> Return selected
    </Fab>
  </div>
}