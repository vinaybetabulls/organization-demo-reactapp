import React, { useState } from 'react';
import { Paper, Button, TextField, Typography, Grid, CssBaseline, CircularProgress } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SaveIcon from '@material-ui/icons/Save';
import { green } from '@material-ui/core/colors';
import uuid from 'react-uuid';

import useFetch from '../../hooks/useFetch';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '60%',
  },
  wrapper: {
    margin: '0px 15px 15px 15px',
  },
  title: {
    padding: '16px 16px 4px 16px',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

const AddOrganisation = () => {
  const classes = useStyles();
  let orgUUID = uuid();
  const token = localStorage.getItem('authToken');
  const { response: createOrg, isAuth, error, isLoading, handleChange, handleSubmit, successResponse } = useFetch({
    url: `organization/createOrganization`,
    method: `POST`,
    token: token
  })
  const handleUploadFile = () => {

  }

  return (
    <React.Fragment>
      <Paper className={classes.root}>
        <CssBaseline />
        {(isLoading) && <CircularProgress size={24} className={classes.buttonProgress} />}
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography component="h2" variant="h6" className={classes.title} color="primary" gutterBottom>Add Company</Typography>
          </Grid>
        </Grid>
        {(error && !successResponse) && <Alert severity="error">{error}</Alert>}
        {(successResponse && !error) && <Alert severity="success">Organization Created Successfully.</Alert>}
        <div className={classes.wrapper}>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="orgId"
                  name="orgId"
                  label="ID"
                  fullWidth
                  autoComplete="given-name" defaultValue={orgUUID} disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="orgName"
                  name="orgName"
                  label="Organisation Name"
                  fullWidth onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="orgCEO"
                  name="orgCEO"
                  label="CEO Name"
                  fullWidth onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="orgLocation"
                  name="orgLocation"
                  label="Location"
                  fullWidth
                  autoComplete="shipping address-line2" onChange={handleChange}
                />
              </Grid>
              {/* <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <div className={classes.root}>
                <input accept="image/*" className={classes.input} id="contained-button-file" type="file" onChange={handleUploadFile} />
                <label htmlFor="contained-button-file">
                  <Button variant="contained" color="primary" className={classes.button} startIcon={<CloudUploadIcon />} component="span" > Upload </Button>
                </label>
                <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />

              </div>
            </Grid>
          </Grid> */}
              <Grid item xs={12} sm={3}>
                <Button type="submit" variant="contained" color="primary" className={classes.button} startIcon={<SaveIcon />}>Save</Button>
              </Grid>
            </Grid>
          </form>

        </div>

      </Paper>
    </React.Fragment>
  );
}

export default AddOrganisation
