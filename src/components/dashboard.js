import React, {useContext} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
import MoneyIcon from '@material-ui/icons/Money';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import BusinessIcon from '@material-ui/icons/Business';
import axios from 'axios';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { LoginContext } from '../context/LoginContext'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.red[600],
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.red[900]
  },
  differenceValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1)
  }
}));

const Dashboard = ({ className, ...rest }) => {
  const classes = useStyles();
  const [orgCount, setOrgCount] = React.useState(0);
  const [compCount, setCompCount] = React.useState(0);
  const [empCount, setEmpCount] = React.useState(0);
  const [desigCount, setDesigCount] = React.useState(0);
  const [departmentCount, setDepartmentCount] = React.useState(0);
  const [isLoggedIn, setIsLoggedIn] = useContext(LoginContext);
  const token = localStorage.getItem('authToken');
  React.useEffect(() => {
    if (token) {
      var decoded = jwtDecode(token);
      const now = Date.now().valueOf() / 1000
      if (typeof decoded.exp !== 'undefined' && decoded.exp < now) {
        setIsLoggedIn(false)
      }
      else {
        setIsLoggedIn(true)
      }
    } else if (!token) {
      setIsLoggedIn(false);
    }
    
    try {
      const getAllCounts = async () => {
        const orgList = await axios.get(`https://organization-demo.herokuapp.com/organization/getAllOrganizationsList`, {
          headers: {
            token: localStorage.getItem('authToken')
          }
        });

        setOrgCount(orgList.data.length);

      }
      const getAllCompanies = async () => {
        const compList = await axios.get(`https://organization-demo.herokuapp.com/company/getAllCompaniesList`, {
          headers: {
            token: localStorage.getItem('authToken')
          }
        });

        setCompCount(compList.data.length);
      }
      const getAllEmployeesList = async () => {

        const empList = await axios.get(`https://organization-demo.herokuapp.com/employee/getAllEmployeesList/`, {
          headers: {
            token: localStorage.getItem('authToken')
          }
        });
        setEmpCount(empList.data.length);
      }
      const getAllDepartmentsList = async () => {

        const departmentList = await axios.get(`https://organization-demo.herokuapp.com/department/getAllDepartmentsList`, {
          headers: {
            token: localStorage.getItem('authToken')
          }
        });
        setDepartmentCount(departmentList.data.length);
      }
      const getAllDesignationsList = async () => {
        const desigList = await axios.get(`https://organization-demo.herokuapp.com/designation/getAllDesignationsList`, {
          headers: {
            token: localStorage.getItem('authToken')
          }
        });
        setDesigCount(desigList.data.length);
      }
      getAllCounts();
      getAllCompanies();
      getAllEmployeesList();
      getAllDesignationsList()
      getAllDepartmentsList()
    } catch (error) {

    }
  }, [isLoggedIn])

  return (
    <>      {localStorage.getItem('authToken') && (<>

      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Card
            className={clsx(classes.root, className)}
            {...rest}
          >
            <CardContent>
              <Grid
                container
                justify="space-between"
                spacing={3}
                component={Link} to='/organisation'
              >
                <Grid item>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="h6"
                  >
                    Organization
            </Typography>
                  <Typography
                    color="textPrimary"
                    variant="h3"
                  >
                    {orgCount}
                  </Typography>
                </Grid>
                <Grid item>
                  <Avatar className={classes.avatar}>
                    <LocationCityIcon />
                  </Avatar>
                </Grid>
              </Grid>
            </CardContent>

          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card
            className={clsx(classes.root, className)}
            {...rest}
          >
            <CardContent>
              <Grid
                container
                justify="space-between"
                spacing={3}
              >
                <Grid item>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="h6"
                  >
                    Companies
            </Typography>
                  <Typography
                    color="textPrimary"
                    variant="h3"
                  >
                    {compCount}
                  </Typography>
                </Grid>
                <Grid item>
                  <Avatar className={classes.avatar}>
                    <BusinessIcon />
                  </Avatar>
                </Grid>
              </Grid>
            </CardContent>

          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card
            className={clsx(classes.root, className)}
            {...rest}
          >
            <CardContent>
              <Grid
                container
                justify="space-between"
                spacing={3}
              >
                <Grid item>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="h6"
                  >
                    Employees
            </Typography>
                  <Typography
                    color="textPrimary"
                    variant="h3"
                  >
                    {empCount}
                  </Typography>
                </Grid>
                <Grid item>
                  <Avatar className={classes.avatar}>
                    <MoneyIcon />
                  </Avatar>
                </Grid>
              </Grid>
            </CardContent>

          </Card>
        </Grid>
      </Grid>
      <div style={{ margin: "10px" }}></div>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Card
            className={clsx(classes.root, className)}
            {...rest}
          >
            <CardContent>
              <Grid
                container
                justify="space-between"
                spacing={3}
              >
                <Grid item>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="h6"
                  >
                    Designations
            </Typography>
                  <Typography
                    color="textPrimary"
                    variant="h3"
                  >
                    {desigCount}
                  </Typography>
                </Grid>
                <Grid item>
                  <Avatar className={classes.avatar}>
                    <LocationCityIcon />
                  </Avatar>
                </Grid>
              </Grid>
            </CardContent>

          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card
            className={clsx(classes.root, className)}
            {...rest}
          >
            <CardContent>
              <Grid
                container
                justify="space-between"
                spacing={3}
              >
                <Grid item>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="h6"
                  >
                    Departments
            </Typography>
                  <Typography
                    color="textPrimary"
                    variant="h3"
                  >
                    {departmentCount}
                  </Typography>
                </Grid>
                <Grid item>
                  <Avatar className={classes.avatar}>
                    <MoneyIcon />
                  </Avatar>
                </Grid>
              </Grid>
            </CardContent>

          </Card>
        </Grid>
      </Grid>
    </>)}
    </>
  );
};

Dashboard.propTypes = {
  className: PropTypes.string
};

export default Dashboard;