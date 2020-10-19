import React, { useState } from 'react';
import { Button, Container, makeStyles, TextField, Theme, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  form: {

  },
  submit: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}))

export interface LoginViewProps {
  onLogin: (username: string, password: string) => void
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {

  const classes = useStyles();

  const [username, setUsername] = useState<string>("");

  const [password, setPassword] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onLogin(username, password);
  }

  return <Container component="main" maxWidth="sm">
    <Typography component="h1" variant="h1">The Library</Typography>

    <form id="loginForm" className={classes.form} noValidate onSubmit={handleSubmit}>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        onChange={(event) => setUsername(event.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        onChange={(event) => setPassword(event.target.value)}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Sign In
          </Button>
    </form>
  </Container>


}