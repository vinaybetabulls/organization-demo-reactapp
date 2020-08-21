import React from 'react';
import './App.css';
import Routes from './routes/Routes';
import MenuBar from './components/MenuBar';
import Footer from './components/footer';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
  return (
    <>
      <MenuBar />
      <Container className={classes.paper}>
        <Routes />
      </Container>
      <Footer />
    </>
  );
}

export default App;
