import React, { useState } from 'react';
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
import Tooltip from '@material-ui/core/Tooltip';
import { Button, Chip, Popover, Typography } from '@material-ui/core';
import { Visibility } from '@material-ui/icons';
import { Book } from '../Model/Book';

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

function getComparator<Key extends keyof Book>(
    order: Order,
    orderBy: Key,
): (a: Book, b: Book) => number {
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

interface BooksTableHeadCell {
    id: keyof Book;
    label: string;
    numeric: boolean;
}

const booksTableHeaderCells: BooksTableHeadCell[] = [
    { id: 'title', numeric: false, label: 'Title' },
    { id: 'author', numeric: false, label: 'Author' },
    { id: 'year', numeric: true, label: 'Year' },
    { id: 'isbn', numeric: false, label: 'ISBN' },
    { id: 'pages', numeric: true, label: 'Pages' },
];

interface BooksTableHeadProps {
    classes: ReturnType<typeof useStyles>;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Book) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

const BooksTableHead: React.FC<BooksTableHeadProps> = ({ classes, order, orderBy, onRequestSort }) => {
    const createSortHandler = (property: keyof Book) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {booksTableHeaderCells.map((headCell) => (
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
        descriptionPopover: {
            maxWidth: "50%"
        }
    }),
);

export type BooksTableMode = "search" | "favourites" | "borrowed"

interface BooksTableProps {
    booksList: Book[];
    booksFilter: (value: Book, index: number, array: Book[]) => boolean;
    displayMode: BooksTableMode;
    onBookSelected: (book: Book | undefined) => void
}

export const BooksTable: React.FC<BooksTableProps> = ({ displayMode, booksList, booksFilter, onBookSelected }) => {
    const classes = useStyles();
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof Book>('author');
    const [selected, setSelected] = useState<Book | undefined>();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [popoverAnchorEl, setPopoverAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [popoverContent, setPopoverContent] = useState<string | null>(null);

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Book) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleClick = (event: React.MouseEvent<unknown>, book: Book) => {
        if (displayMode === 'borrowed' || book.borrowDate == null) {
            const newSelectedBook = (selected && selected.isbn === book.isbn) ? undefined : book;
            setSelected(newSelectedBook);
            onBookSelected(newSelectedBook);
        }
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const openDescriptionPopover = (event: React.MouseEvent<HTMLButtonElement>, popoverContent: string) => {
        setPopoverContent(popoverContent);
        setPopoverAnchorEl(event.currentTarget);
    };

    const closeDescriptionPopover = () => {
        setPopoverAnchorEl(null);
    }

    const isSelected = (book: Book) => (selected && selected.isbn === book.isbn);

    const emptyRows = booksList ? rowsPerPage - Math.min(rowsPerPage, booksList.length - page * rowsPerPage) : 0;

    const popoverOpen = Boolean(popoverAnchorEl);

    const popoverId = popoverOpen ? 'simple-popover' : undefined;

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <TableContainer>
                    <Table className={classes.table} aria-labelledby="tableTitle" size="medium" aria-label="enhanced table">
                        <BooksTableHead
                            classes={classes}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={booksList.length}
                        />
                        <TableBody>
                            {stableSort(booksList, getComparator(order, orderBy))
                                .filter(booksFilter)
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((book, index) => {
                                    const isItemSelected = isSelected(book);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover={displayMode === 'borrowed' || book.borrowDate === null}
                                            onClick={(event) => handleClick(event, book)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={book.bookId}
                                            selected={isItemSelected}
                                        >
                                            <TableCell key="title" component="th" id={labelId} scope="row">
                                                {book.title} 
                                                <Tooltip title="Read description"><Button onClick={(event) => { openDescriptionPopover(event, book.description) }}><Visibility /></Button></Tooltip>
                                                {book.returnDate && <Chip label={"Borrowed until " + new Date(book.returnDate).toLocaleDateString()} />}
                                            </TableCell>
                                            <TableCell key="author" align="center">{book.author}</TableCell>
                                            <TableCell key="year" align="center">{book.year}</TableCell>
                                            <TableCell key="isbn" align="center">{book.isbn}</TableCell>
                                            <TableCell key="pages" align="center">{book.pages}</TableCell>
                                        </TableRow>
                                    );
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
                    count={booksList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            <Popover
                id={popoverId}
                open={popoverOpen}
                anchorEl={popoverAnchorEl}
                onClose={closeDescriptionPopover}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                className={classes.descriptionPopover}
            >
                <Typography variant="body1">{popoverContent}</Typography>
            </Popover>
        </div>
    );
}
