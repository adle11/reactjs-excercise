import React, { useEffect, useState } from 'react';
import { Container, Divider, makeStyles, Theme, Typography } from '@material-ui/core';
import { User } from '../Model/User';
import { APP_CONFIG } from '../Config';

const getRequestHeader = (token: string | null) => {
    return {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + (token ? token : '')
    }
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {

    },
    divider: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    }

}))

export interface MyProfileViewProps {
    userId: number | undefined;
}

export const MyProfileView: React.FC<MyProfileViewProps> = ({ userId }) => {

    const classes = useStyles();

    const [user, setUser] = useState<User>();

    const [, setErrors] = useState<boolean>(false);

    const getUserData = async (userId: number) => {
        const res = await fetch(
            APP_CONFIG.endpointAddress + `/users/${userId}/profile`, 
            { 
                headers: getRequestHeader(localStorage.getItem('token')) 
            })
        res
            .json()
            .then(res => {
                if ("error" in res) {
                    setErrors(true);
                } else {
                    setErrors(false);
                    setUser(res);
                }
            })
            .catch(() => setErrors(true))
    }

    useEffect(() => {
        if (userId) {
            getUserData(userId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <Container className={classes.root}>
        <Typography variant="h2">My profile</Typography>
        
        <Divider className={classes.divider} />
        
        <Typography variant="overline">Name</Typography>
        <Typography variant="body1">{user && user.name}</Typography>

        <Typography variant="overline">Surname</Typography>
        <Typography variant="body1">{user && user.surname}</Typography>

        <Typography variant="overline">Library card ID</Typography>
        <Typography variant="body1">{user && user.libraryCardId}</Typography>

        <Typography variant="overline">Email</Typography>
        <Typography variant="body1">{user && user.email}</Typography>

        <Typography variant="overline">Phone</Typography>
        <Typography variant="body1">{user && user.phone}</Typography>

        <Typography variant="overline">Address</Typography>
        <Typography variant="body1">{user && user.address}</Typography>

        <Divider className={classes.divider} />

        <Typography variant="body1">
            If you want to edit your data, please contact us!
        </Typography>
    </Container>

};