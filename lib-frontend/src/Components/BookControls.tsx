import React from 'react';
import { Fab, makeStyles, Theme } from '@material-ui/core';
import { ShoppingCartOutlined, FavoriteBorder } from '@material-ui/icons';

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

export interface BookControlsProps {
  onBorrowButtonClicked: () => void;
  onFavouritesButtonClicked: () => void;
}

export const BookControls: React.FC<BookControlsProps> = ({ onBorrowButtonClicked, onFavouritesButtonClicked }) => {

  const classes = useStyles();

  return <div className={classes.floatingButtonsContainer}>
    <Fab color="primary" aria-label="borrow" variant="extended" onClick={onBorrowButtonClicked}>
      <ShoppingCartOutlined className={classes.extendedIcon} /> Borrow selected
    </Fab>
    <Fab color="primary" aria-label="star" onClick={onFavouritesButtonClicked}>
      <FavoriteBorder />
    </Fab>
  </div>
}