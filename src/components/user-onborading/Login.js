import React, { useEffect, useState, useReducer } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Typography, CircularProgress, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Alert } from '@material-ui/lab';
import { green } from '@material-ui/core/colors';
import { Redirect } from 'react-router';
import useFetch from '../../hooks/useFetch';
import jwtDecode from 'jwt-decode';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px 15px'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  buttonProgress: {
    color: green[500],
    top: '45%',
    left: '50%',
    position: 'absolute'
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);

  const { response: authToken, isAuth, error, isLoading, handleChange, handleSubmit } = useFetch({
    url: `user/login`,
    method: `POST`
  })

  const token = localStorage.getItem('authToken');
  
  
  useEffect(() => {
    if(token) {
      var decoded = jwtDecode(token);
      const now = Date.now().valueOf() / 1000
      if (typeof decoded.exp !== 'undefined' && decoded.exp < now) {
        console.log(`token expired: ${JSON.stringify(decoded)}`)
        setAuth(false);
      } 
    } else if (!token) {
      setAuth(false);
    }
  }, [])

  return (
    // (auth === true) ? <p> not Expired</p> : 
    (localStorage.getItem('authToken')) ? <Redirect to={`/organisation`} /> : <Container component="main" maxWidth="xs">
      <CssBaseline /> 
      {(error) && <Alert severity="error">{error}</Alert>}
      {(isLoading) && <CircularProgress size={50} className={classes.buttonProgress} />}
      <Paper>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in {auth}
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField variant="outlined" margin="normal" fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus onChange={handleChange} required />
            <TextField variant="outlined" margin="normal" fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" onChange={handleChange} required />
            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} > Sign In </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Paper>

    </Container>
  );
}