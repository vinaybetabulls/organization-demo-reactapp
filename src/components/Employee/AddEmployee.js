import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Paper } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { Alert, AlertTitle } from '@material-ui/lab';

import axios from 'axios';
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px 15px'
  },
  wrapper: {
    maxWidth: '500px',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const AddEmployee = () => {
  const classes = useStyles();
  const [designationsList, setDesingationsList] = React.useState([])
  const [departmentList, setDepartmentList] = React.useState([])
  const [companiesList, setCopaniesList] = React.useState([])
  const [addEmployeesData, setEmployeesData] = React.useState({})
  const [employeeAddResponse, setEmployeeAddResponse] = React.useState(false);

  React.useEffect(() => {
    /**
     * desgination
     */
    const getDesginationsList = async () => {
      let designations = await axios.get('https://organization-demo.herokuapp.com/designation/getAllDesignationsList', {
        headers: {
          token: localStorage.getItem('authToken')
        }
      })
      designations = designations.data;
      designations = designations.map((designation) => {
        return { label: designation.designationName, value: designation.designationName, designationName: designation.designationName, designationId: designation.designationId }
      })
      setDesingationsList(designations)
    }
    getDesginationsList()

    /**
     * @name getDepartmentList
     */
    const getDepartmentList = async () => {
      let departments = await axios.get('https://organization-demo.herokuapp.com/department/getAllDepartmentsList', {
        headers: {
          token: localStorage.getItem('authToken')
        }
      })
      departments = departments.data;
      departments = departments.map((department) => {
        return { label: department.departmentName, value: department.departmentName, departmentId: department.departmentId, departmentName: department.departmentName }
      })
      setDepartmentList(departments)
    }
    getDepartmentList()
    /**
     * @name getComapniesList
     */
    const getAllCompniesList = async () => {
      let companies = await axios.get('https://organization-demo.herokuapp.com/company/getAllCompaniesList', {
        headers: {
          token: localStorage.getItem('authToken')
        }
      })
      companies = companies.data;
      companies = companies.length > 0 && companies.map((company) => {
        return { label: company.companyName, value: company.companyName, companyName: company.companyName, companyId: company.companyId }
      })
      setCopaniesList(companies)
    }
    getAllCompniesList()

  }, [])

  const handleChange = (event) => {
    if (event.target.name === 'designation') {
      const designationAdd = designationsList.filter((designation) => designation.designationName === event.target.value);
      const desig = {
        designationId: designationAdd[0].designationId,
        designationName: designationAdd[0].designationName
      }
      setEmployeesData({ ...addEmployeesData, designation: desig });
    }
    else if (event.target.name === 'company') {

      const companyAdd = companiesList.filter((company) => company.companyName === event.target.value);
      const companydata = {
        companyId: companyAdd[0].companyId,
        companyName: companyAdd[0].companyName
      }
      setEmployeesData({ ...addEmployeesData, company: companydata });
    }
    else if (event.target.name === 'department') {
      const departmentAdd = departmentList.filter((department) => department.departmentName === event.target.value);
      const departments = {
        departmentId: departmentAdd[0].departmentId,
        departmentName: departmentAdd[0].departmentName
      }
      setEmployeesData({ ...addEmployeesData, department: departments });
    }
    else if (event.target.name !== 'designation' || event.target.name !== 'company' || event.target.name !== 'department') {
      setEmployeesData({ ...addEmployeesData, [event.target.name]: event.target.value });
    }

  }
  const addEmployee = async () => {
    try {
      const repsonse = await axios.post(`https://organization-demo.herokuapp.com/employee/createEmployee`, addEmployeesData, {
        headers: {
          token: localStorage.getItem('authToken')
        }
      });
      if (repsonse && (repsonse.status === 201 || repsonse.status === 200)) {
        setEmployeeAddResponse(true)
      }
      else {
        setEmployeeAddResponse('error');
      }
    } catch (error) {
      setEmployeeAddResponse('error');
    }

  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {employeeAddResponse && (<Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        Employee created successfully!
      </Alert>)}
      {employeeAddResponse === 'error' && (<Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        Employee creation failed!
      </Alert>)}
      <Paper className={classes.wrapper}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add Employee
        </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="employee fname"
                  name="employeeFirstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="empFname"
                  label="Employee First Name"
                  autoFocus
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="employee lname"
                  name="employeeLastName"
                  variant="outlined"
                  required
                  fullWidth
                  id="empLname"
                  label="Employee Last Name"
                  autoFocus
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="employee email"
                  name="employeeEmail"
                  variant="outlined"
                  required
                  fullWidth
                  id="empEmail"
                  label="Employee Email"
                  autoFocus
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="employee location"
                  name="employeeLocation"
                  variant="outlined"
                  required
                  fullWidth
                  id="empLocation"
                  label="Employee Location"
                  autoFocus
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="employee Phone"
                  name="phoneNumber"
                  variant="outlined"
                  required
                  fullWidth
                  id="empPhone"
                  label="Employee Phone"
                  autoFocus
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormControl required className={classes.formControl}>
                  <InputLabel id="demo-simple-select-helper-label">Designation</InputLabel>
                  <Select
                    labelId="standard-select-designation"
                    id="standard-select-designation"
                    onChange={handleChange}
                    name="designation"
                  >
                    {designationsList.length > 0 && designationsList.map((option) => (
                      <MenuItem key={option.id} value={option.designationName}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormControl required className={classes.formControl}>
                  <InputLabel id="demo-simple-select-helper-label">Department</InputLabel>
                  <Select
                    labelId="standard-select-department"
                    id="standard-select-department"
                    onChange={handleChange}
                    name="department"
                  >
                    {departmentList.length > 0 && departmentList.map((option) => (
                      <MenuItem key={option.id} value={option.departmentName} >
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormControl required className={classes.formControl}>
                  <InputLabel id="demo-simple-select-helper-label">Company</InputLabel>
                  <Select
                    labelId="standard-select-company"
                    id="standard-select-company"
                    onChange={handleChange}
                    name="company"
                  >
                    {companiesList.length > 0 && companiesList.map((option) => (
                      <MenuItem key={option.id} value={option.companyName}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={addEmployee}
            >
              Add Employee
          </Button>
          </form>
        </div>
      </Paper>
    </Container>
  )
}

export default AddEmployee
