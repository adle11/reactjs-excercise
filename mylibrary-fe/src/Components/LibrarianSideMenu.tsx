import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles, Theme, Toolbar } from "@material-ui/core"
import { ExitToApp, MenuBook, People } from "@material-ui/icons";
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
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  }
}))

export interface LibrarianSideMenuProps {
  currentViewMode: ViewMode;
  onItemSelected: (newViewMode: ViewMode) => void;
  onLogoutClicked: () => void;
}

export const LibrarianSideMenu: React.FC<LibrarianSideMenuProps> = ({ currentViewMode, onItemSelected, onLogoutClicked }) => {

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
        <ListItem button key="Books" selected={currentViewMode === "BooksListView"} onClick={() => { onItemSelected("BooksListView") }}>
          <ListItemIcon><MenuBook /></ListItemIcon>
          <ListItemText primary="Books" />
        </ListItem>
        <ListItem button key="Clients" selected={currentViewMode === "ClientsListView"} onClick={() => { onItemSelected("ClientsListView") }}>
          <ListItemIcon><People /></ListItemIcon>
          <ListItemText primary="Clients" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button key="Logout" onClick={onLogoutClicked}>
          <ListItemIcon><ExitToApp /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  </Drawer>

}