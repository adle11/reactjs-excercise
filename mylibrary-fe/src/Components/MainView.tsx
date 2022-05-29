import React, { useState } from 'react';
import { AppBar, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { BooksListView } from './BooksListView';
import { FavouriteBooksView } from './FavouriteBooksView';
import { BorrowedView } from './BorrowedView';
import { MyProfileView } from './MyProfileView';
import { UserRole } from '../Model/User';
import { ClientSideMenu } from './ClientSideMenu';
import { LibrarianSideMenu } from './LibrarianSideMenu';
import { ClientsListView } from './ClientsListView';

export type ViewMode = "BooksListView" | "FavouriteBooksView" | "BorrowedView" | "MyProfileView" | "ClientsListView";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  menuButton: {

  },
  title: {

  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  }
}))

export interface MainViewProps {
  userId: number | undefined;
  userRole: UserRole | undefined;
  onLogout: () => void
}

export const MainView: React.FC<MainViewProps> = ({ userId, userRole, onLogout }) => {

  const classes = useStyles();

  const [viewMode, setViewMode] = useState<ViewMode>("BooksListView");

  const handleViewChange = (newViewMode: ViewMode) => {
    setViewMode(newViewMode)
  }

  return <div className={classes.root}>
    <AppBar className={classes.appBar} position="fixed">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          The Library - {userRole === "librarian" ? "Librarian Mode" : "Client Mode"}
        </Typography>
      </Toolbar>
    </AppBar>
    {userRole === "client" && <ClientSideMenu currentViewMode={viewMode} onItemSelected={handleViewChange} onLogoutClicked={onLogout} />}
    {userRole === "librarian" && <LibrarianSideMenu currentViewMode={viewMode} onItemSelected={handleViewChange} onLogoutClicked={onLogout} />}
    <main className={classes.content}>
      <Toolbar />
      {viewMode === "BooksListView" && <BooksListView userId={userId} userRole={userRole} />}
      {viewMode === "FavouriteBooksView" && <FavouriteBooksView userId={userId} />}
      {viewMode === "BorrowedView" && <BorrowedView userId={userId} />}
      {viewMode === "MyProfileView" && <MyProfileView userId={userId} />}
      {viewMode === "ClientsListView" && <ClientsListView />}
    </main>
  </div>
}   