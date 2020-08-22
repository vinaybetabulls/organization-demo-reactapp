import React, { useEffect, useState } from 'react'
import { CircularProgress, Select, FormControl, MenuItem, InputLabel, Backdrop, Paper, Grid, Typography, Button, TextField } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';

import uuid from 'react-uuid';
import axios from 'axios'


const useStyles = makeStyles((theme) => ({
  root: {
    width: '60%',
  },
  container: {
    maxHeight: 340,
  },
  title: {
    padding: '16px 16px 4px 16px',
  },
  wrapper: {
    margin: '0px 15px 15px 15px',
  },
  formControl: {
    //margin: theme.spacing(1),
    minWidth: 700,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const AddCompany = () => {
  const classes = useStyles();
  let cmpUUID = uuid();
  const [orgs, setOrgs] = useState([])
  const [addCompanyData, setCompanyData] = useState({});
  const [companyAddResponse, setCompanyAddResponse] = useState(false);
  const [companyErrorResponse, setCompanyErrorResponse] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getAllOrgs = async () => {
      const getOrgs = await axios.get(`https://organization-demo.herokuapp.com/organization/getAllOrganizationsList`, { headers: { token: localStorage.getItem('authToken') } });
      let menuItems = getOrgs.data.length > 0 && getOrgs.data.map(org => { return { organizationId: org.orgId, orgName: org.orgName } })
      setOrgs(menuItems);
    }
    getAllOrgs();
  }, [])
  const handleChange = (event) => {
    if (event.target.name === 'organizationId') {
      const orgAdd = orgs.filter((organization) => {
        if (organization.organizationId === event.target.value) {
          return organization
        }
      });
      const orgData = {
        orgId: orgAdd[0].organizationId,
        orgName: orgAdd[0].orgName
      }

      setCompanyData({ ...addCompanyData, organization: orgData });
    }
    else {
      setCompanyData({ ...addCompanyData, [event.target.name]: event.target.value })
    }
  }

  const handleSubmit = async (event) => {
    setIsLoading(true);
    addCompanyData.companyId = event.target.companyId.value;
    event.preventDefault();
    try {
      const repsonse = await axios.post(`https://organization-demo.herokuapp.com/company/createCompany`, addCompanyData, {
        headers: {
          token: localStorage.getItem('authToken')
        }
      });
      if (repsonse && (repsonse.status === 201 || repsonse.status === 200)) {
        setCompanyAddResponse(true);
        setIsLoading(false);
      }
      else {
        setCompanyErrorResponse({ message: repsonse.message })
      }
    } catch (error) {
      setIsLoading(false);
      if (!error.status) {
        setCompanyErrorResponse({ message: 'Please provide valid data' })
      }
      else {
        setCompanyErrorResponse({ message: error.status });
      }
    }

  }

  return (
    <Paper className={classes.root}>
      {
        (isLoading) && <Backdrop className={classes.backdrop} open={isLoading}>
          <CircularProgress size={60} thickness={4} color="inherit" />
        </Backdrop>
      }
      <Grid container>
        <Grid item xs={6}>
          <Typography component="h2" variant="h6" className={classes.title} color="primary" gutterBottom>Add Company</Typography>
        </Grid>
      </Grid>
      {(companyAddResponse && !companyErrorResponse.message) && (<Alert severity="success">
        Company created successfully!
      </Alert>)}
      {(companyErrorResponse.message && !companyAddResponse) && (<Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {companyErrorResponse.message}
      </Alert>)}
      <div className={classes.wrapper}>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField id="companyId" name="companyId" label="ID" fullWidth autoComplete="given-name" defaultValue={cmpUUID} disabled />
            </Grid>
            <Grid item xs={12}>
              <TextField id="companyName" name="companyName" label="Name" fullWidth required onChange={handleChange} autoFocus/>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField id="companyLocation" name="companyLocation" label="Location" fullWidth required onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-autowidth-label">Organisation</InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="organizationId"
                  name="organizationId"
                  onChange={handleChange} >
                  <MenuItem value=""> <em>None</em> </MenuItem>
                  {
                    orgs.length > 0 && orgs.map(org => <MenuItem key={org.organizationId} value={org.organizationId}>{org.orgName}</MenuItem>)
                  }
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={3}>
              <Button type="submit" variant="contained" color="primary" className={classes.button} startIcon={<SaveIcon />}>Add</Button>
            </Grid>
          </Grid>
        </form>
      </div>

    </Paper>
  )
}

export default AddCompany

