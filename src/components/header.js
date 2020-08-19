import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
    lineHeight: 1.75,
    letterSpacing: '0.02857em',
    textTransform: 'uppercase',
    color: 'white',
    textDecoration: 'none',
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" color="primary" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            Application Name
          </Typography>
          <nav>
            <NavLink variant="button" color="inherit" to="/organisation" className={classes.link}>
              Organisations
            </NavLink>
            <NavLink variant="button" color="inherit" to="/companies" className={classes.link}>
              Companies
            </NavLink>
            <NavLink variant="button" color="inherit" to="/department" className={classes.link}>
              Departments
            </NavLink>
            <NavLink variant="button" color="inherit" to="/designation" className={classes.link}>
              Designations
            </NavLink>
            <NavLink variant="button" color="inherit" to="/employees" className={classes.link}>
              Employees
            </NavLink>
          </nav>
          <Button href="#" color="inherit" variant="outlined" className={classes.link}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}