import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import { Button, ButtonGroup } from '@material-ui/core';
import { Block, LibraryBooks, MailOutline } from '@material-ui/icons';
import { Client } from '../Model/User';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof Client>(
  order: Order,
  orderBy: Key,
): (a: Client, b: Client) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface ClientsTableHeadCell {
  id: keyof Client;
  label: string;
  numeric: boolean;
}

const clientsTableHeadCells: ClientsTableHeadCell[] = [
  { id: 'libraryCardId', numeric: true, label: 'Library Card' },
  { id: 'name', numeric: false, label: 'Name' },
  { id: 'surname', numeric: false, label: 'Surname' },
  { id: 'email', numeric: false, label: 'Email' },
  { id: 'phone', numeric: false, label: 'Phone' },
  { id: 'address', numeric: false, label: 'Address' },
];

interface ClientsTableHeadProps {
  classes: ReturnType<typeof useStyles>;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Client) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

const ClientsTableHead: React.FC<ClientsTableHeadProps> = ({ classes, order, orderBy, onRequestSort }) => {
  const createSortHandler = (property: keyof Client) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {clientsTableHeadCells.map((headCell) => (
          <TableCell key={headCell.id} align="center" padding="default" sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
    optionButtons: {
      margin: theme.spacing(1)
    }
  }),
);

interface ClientsTableProps {
  clientsList: Client[];
  clientsFilter: (value: Client, index: number, array: Client[]) => boolean;
  onClientSelected: (client: Client | undefined) => void;
}

export const ClientsTable: React.FC<ClientsTableProps> = ({ clientsList, clientsFilter, onClientSelected }) => {
  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Client>('libraryCardId');
  const [selectedClient, setSelectedClient] = React.useState<Client | undefined>();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Client) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event: React.MouseEvent<unknown>, client: Client) => {
    const newSelectedClient = (selectedClient && selectedClient.libraryCardId === client.libraryCardId) ? undefined : client;
    setSelectedClient(newSelectedClient);
    onClientSelected(newSelectedClient);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (client: Client) => (selectedClient && selectedClient.libraryCardId === client.libraryCardId);

  const emptyRows = clientsList ? rowsPerPage - Math.min(rowsPerPage, clientsList.length - page * rowsPerPage) : 0;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table className={classes.table} aria-labelledby="tableTitle" size="medium" aria-label="enhanced table">
            <ClientsTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={clientsList.length}
            />
            <TableBody>
              {stableSort(clientsList, getComparator(order, orderBy))
                .filter(clientsFilter)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((client, index) => {
                  const isItemSelected = isSelected(client);

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, client)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={client.libraryCardId}
                      selected={isItemSelected}
                    >
                      <TableCell key="libraryCardId" component="th" id="libraryCardId" scope="row" align="center">{client.libraryCardId}</TableCell>
                      <TableCell key="name" align="center">{client.name}</TableCell>
                      <TableCell key="surname" align="center">{client.surname}</TableCell>
                      <TableCell key="email" align="center">{client.email}</TableCell>
                      <TableCell key="phone" align="center">{client.phone}</TableCell>
                      <TableCell key="address" align="center">{client.address}</TableCell>
                    </TableRow>
                  )
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={clientsList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
