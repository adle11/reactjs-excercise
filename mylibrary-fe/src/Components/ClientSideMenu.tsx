import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles, Theme, Toolbar } from "@material-ui/core"
import { Search, LibraryBooks, AccountBox, ExitToApp, FavoriteOutlined } from "@material-ui/icons";
import React from "react"
import { ViewMode } from "./MainView";

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: 200,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 200,
  },
  drawerContainer: {
    overflow: 'auto',
  }
}))

export interface ClientSideMenuProps {
  currentViewMode: ViewMode;
  onItemSelected: (newViewMode: ViewMode) => void;
  onLogoutClicked: () => void;
}

export const ClientSideMenu: React.FC<ClientSideMenuProps> = ({ currentViewMode, onItemSelected, onLogoutClicked }) => {

  const classes = useStyles();

  return <Drawer
    className={classes.drawer}
    variant="permanent"
    classes={{
      paper: classes.drawerPaper,
    }}
  >
    <Toolbar />
    <div className={classes.drawerContainer}>
      <List>
        <ListItem button key="Search" selected={currentViewMode === "BooksListView"} onClick={() => { onItemSelected("BooksListView") }}>
          <ListItemIcon><Search /></ListItemIcon>
          <ListItemText primary="Search" />
        </ListItem>
        <ListItem button key="Favourites" selected={currentViewMode === "FavouriteBooksView"} onClick={() => { onItemSelected("FavouriteBooksView") }}>
          <ListItemIcon><FavoriteOutlined /></ListItemIcon>
          <ListItemText primary="Favourite Books" />
        </ListItem>
        <ListItem button key="Borrowed" selected={currentViewMode === "BorrowedView"} onClick={() => { onItemSelected("BorrowedView") }}>
          <ListItemIcon><LibraryBooks /></ListItemIcon>
          <ListItemText primary="Borrowed" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button key="My profile" selected={currentViewMode === "MyProfileView"} onClick={() => { onItemSelected("MyProfileView") }}>
          <ListItemIcon><AccountBox /></ListItemIcon>
          <ListItemText primary="My profile" />
        </ListItem>
        <ListItem button key="Logout" onClick={onLogoutClicked}>
          <ListItemIcon><ExitToApp /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  </Drawer>

}