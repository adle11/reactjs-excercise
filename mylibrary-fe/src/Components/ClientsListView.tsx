import React, { useEffect, useState } from 'react';
import { Box, TextField, Tooltip } from '@material-ui/core';
import { Client } from '../Model/User';
import { ClientsTable } from './ClientsTable';
import { APP_CONFIG } from '../Config';
import { ClientControls } from './ClientControls';
import { BorrowedBooksListModal } from './BorrowedBooksListModal';
import { Book } from '../Model/Book';

const getRequestHeaders = (token: string | null) => {
    return {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + (token ? token : '')
    }
}

export const ClientsListView: React.FC = () => {

    const [clients, setClients] = useState<Client[]>([] as Client[]);

    const [selectedClient, setSelectedClient] = useState<Client | undefined>();

    const [borrowedBooks, setBorrowedBooks] = useState<Book[] | undefined>();

    const [hasErrors, setErrors] = useState<boolean>(false);

    const [filterPredicate, setFilterPredicate] = useState<string | null>(null);

    const [isBorrowedListModalOpen, setBorrowedListModalOpen] = useState<boolean>(false);

    const handleFilter = (event: any): void => setFilterPredicate(event.target.value);

    const clientsFilter = (value: Client): boolean => {
        if (filterPredicate === null) {
            return true;
        }
        return (value.name.includes(filterPredicate) || value.surname.includes(filterPredicate) || value.libraryCardId.includes(filterPredicate))
    }


    const getAllClients = async () => {
        const res = await fetch(APP_CONFIG.endpointAddress + "/users/clients", { headers: getRequestHeaders(localStorage.getItem('token')) })
        res
            .json()
            .then(res => {
                setClients(res)
            })
            .catch(() => setErrors(true))
    }

    const getBorrowedBooks = async (clientId: number) => {
        const res = await fetch(APP_CONFIG.endpointAddress + `/users/${clientId}/borrowed`, { headers: getRequestHeaders(localStorage.getItem('token')) })
        res
            .json()
            .then(res => {
                if ("error" in res) {
                    setErrors(true);
                } else {
                    setErrors(false);
                    setBorrowedBooks(res);
                }
            })
            .catch(() => setErrors(true))
    }

    const handleBorrowedClicked = () => {
        if (selectedClient) {
            getBorrowedBooks(selectedClient.userId);
            setBorrowedListModalOpen(true)
        }
    }

    const handleSuspendClicked = () => {
        console.log("User suspended")
    }

    useEffect(() => {
        getAllClients();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <div>
        <Box component="div" py={3}>
            <Tooltip title="Clients filter"><TextField id="filter-input" label="Books filter" variant="outlined" fullWidth onChange={handleFilter} /></Tooltip>
        </Box>
        <ClientsTable clientsList={clients} clientsFilter={clientsFilter} onClientSelected={setSelectedClient} />
        {selectedClient && <ClientControls clientEmail={selectedClient?.email} onBorrowedBooksClicked={handleBorrowedClicked} onSuspendClicked={handleSuspendClicked} />}
        <BorrowedBooksListModal isOpen={isBorrowedListModalOpen} client={selectedClient} borrowedBooks={borrowedBooks} onButtonClicked={() => { setBorrowedListModalOpen(false) }} />

    </div>

};
