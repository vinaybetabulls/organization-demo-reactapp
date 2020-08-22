import React, {useState, useEffect} from 'react';
import './App.css';
import Routes from './routes/Routes';
import MenuBar from './components/MenuBar';
import Footer from './components/footer';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import jwtDecode from 'jwt-decode';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
}));

function App() {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    if(token) {
      var decoded = jwtDecode(token);
      const now = Date.now().valueOf() / 1000
      if (typeof decoded.exp !== 'undefined' && decoded.exp < now) {
        setAuth(false);
      }
    } else if (!token) {
      setAuth(false);
    }
  },[])

  return (
    <>
      <MenuBar auth={auth}/>
      <Container className={classes.paper}>
        <Routes />
      </Container>
      <Footer />
    </>
  );
}

export default App;
