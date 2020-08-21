import React, { useEffect, useState } from 'react'
import { Paper, Grid, Typography, Button, TextField, Divider } from '@material-ui/core'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import uuid from 'react-uuid';
import axios from 'axios'
import { Alert, AlertTitle } from '@material-ui/lab';


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
    margin: theme.spacing(1),
    minWidth: 200,
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const AddCompany = () => {
  const classes = useStyles();
  let cmpUUID = uuid();
  const [orgs, setOrgs] = useState([])
  const [addCompanyData, setCompanyData] = useState({});
  const [companyAddResponse, setCompanyAddResponse] = useState(false);

  useEffect(() => {
    const getAllOrgs = async () => {
      const getOrgs = await axios.get(`https://organization-demo.herokuapp.com/organization/getAllOrganizationsList`, { headers: { token: localStorage.getItem('authToken') } });
      let menuItems = getOrgs.data.length > 0 && getOrgs.data.map(org => { return { organizationId: org.orgId, orgName: org.orgName } })
      setOrgs(menuItems);
    }
    getAllOrgs();
  }, [])
  const handleChange = (event) => {
    console.log(event.target.name)
    if (event.target.name === 'organizationId') {
      const orgAdd = orgs.filter((organization) => {
        console.log('inside filter...', organization)
        if(organization.organizationId === event.target.value) {
          return organization
        }
      });
      console.log('orgData...', orgAdd);
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
    console.log(addCompanyData)
    addCompanyData.companyId = event.target.companyId.value;
    event.preventDefault();
    console.log('addCompanyData...', addCompanyData);
    const repsonse = await axios.post(`https://organization-demo.herokuapp.com/company/createCompany`, addCompanyData, {
      headers: {
        token: localStorage.getItem('authToken')
      }
    });
    if (repsonse && (repsonse.status === 201 || repsonse.status === 200)) {
      setCompanyAddResponse(true)
    }
  }

  return (
    <Paper className={classes.root}>
      {companyAddResponse && (<Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        Company created successfully!
      </Alert>)}
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Typography component="h2" variant="h6" className={classes.title} color="primary" gutterBottom>Add Company</Typography>
        </Grid>
      </Grid>
      <div className={classes.wrapper}>
        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField id="companyId" name="companyId" label="ID" fullWidth autoComplete="given-name" defaultValue={cmpUUID} disabled />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField id="companyName" name="companyName" label="Name" fullWidth required onChange={handleChange} />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField id="companyLocation" name="companyLocation" label="Location" fullWidth required onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-autowidth-label">Organisation</InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="organizationId"
                  name="organizationId"
                  onChange={handleChange}
                  fullWidth
                >
                  <MenuItem value=""> <em>None</em> </MenuItem>
                  {
                    orgs.length > 0 && orgs.map(org => <MenuItem key={org.organizationId} value={org.organizationId}>{org.orgName}</MenuItem>)
                  }
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Divider />
          <Grid item xs={12} sm={6}>
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} > Add </Button>
          </Grid>
        </form>
      </div>

    </Paper>
  )
}

export default AddCompany

