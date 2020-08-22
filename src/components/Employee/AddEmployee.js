import React from 'react';
import { Paper, MenuItem, Typography, Grid, Select, FormControl, InputLabel, TextField, Button, Backdrop, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import SaveIcon from '@material-ui/icons/Save';

import axios from 'axios';
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

const AddEmployee = () => {
  const classes = useStyles();
  const [designationsList, setDesingationsList] = React.useState([])
  const [departmentList, setDepartmentList] = React.useState([])
  const [companiesList, setCopaniesList] = React.useState([])
  const [addEmployeesData, setEmployeesData] = React.useState({})
  const [employeeAddResponse, setEmployeeAddResponse] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

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
    setIsLoading(true);
    try {
      const repsonse = await axios.post(`https://organization-demo.herokuapp.com/employee/createEmployee`, addEmployeesData, {
        headers: {
          token: localStorage.getItem('authToken')
        }
      });
      if (repsonse && (repsonse.status === 201 || repsonse.status === 200)) {
        setEmployeeAddResponse(true)
        setIsLoading(false);
      }
      else {
        setEmployeeAddResponse('error');
        setIsLoading(false);
      }
    } catch (error) {
      setEmployeeAddResponse('error');
      setIsLoading(false);
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
          <Typography component="h2" variant="h6" className={classes.title} color="primary" gutterBottom>Add Employee</Typography>
        </Grid>
      </Grid>
      {(employeeAddResponse && !employeeAddResponse.message) && (<Alert severity="success">
        Employee created successfully!
      </Alert>)}
      {employeeAddResponse === 'error' && (<Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        Employee creation failed!
      </Alert>)}
      <div className={classes.wrapper}>
        <form className={classes.form} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField autoComplete="employee fname" name="employeeFirstName" required fullWidth id="empFname" label="First Name" autoFocus onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField autoComplete="employee lname" name="employeeLastName" required fullWidth id="empLname" label="Last Name" onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="employee email"
                name="employeeEmail"
                required
                fullWidth
                id="empEmail"
                label="Employee Email"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="employee Phone"
                name="phoneNumber"
                required
                fullWidth
                id="empPhone"
                label="Employee Phone"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
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
            <Grid item xs={12} sm={3}>
              <Button type="button" variant="contained" color="primary" className={classes.button} startIcon={<SaveIcon />} onClick={addEmployee}>Add</Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Paper>
  )
}

export default AddEmployee
