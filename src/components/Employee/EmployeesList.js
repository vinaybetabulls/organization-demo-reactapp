import React, { useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Typography, Grid, Button } from '@material-ui/core';
import PageviewIcon from '@material-ui/icons/Pageview';
import { Link } from 'react-router-dom';

import useFetch from '../../hooks/useFetch';
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#3D4A77",
    color: theme.palette.common.white,
    fontSize: 16,
    fontWeight: 800
  },
  body: {
    fontSize: 16,
  },
}))(TableCell);

const columns = [
  { id: 'employeeFirstName', label: 'Employee First Name', minWidth: 120 },
  { id: 'employeeLastName', label: 'Employee Last Name', minWidth: 120 },
  { id: 'employeeEmail', label: 'Employee Email', minWidth: 120 },
  { id: 'departmentName', label: 'Employee Department', minWidth: 120 },
  { id: 'designationName', label: 'Employee Designation', minWidth: 120 },
  { id: 'companyName', label: 'Employee Company', minWidth: 100 },
  { id: 'actions', label: 'Actions', minWidth: 100, align: 'center' },
];




const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  title: {
    padding: '16px 16px 4px 16px',
  },
}));

const EmployeesList = () => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);

  const url = `employee/getAllEmployeesList`;
  const token = localStorage.getItem('authToken');
  const method = "GET";
  const { fetchData } = useFetch({ url, token, method })

  useEffect(() => {
    const getEmployeesList = async () => {
      let employessList = await fetchData();

      if (employessList.length > 0) {
        employessList = employessList.map(employee => {
          return {
            employeeFirstName: employee.employeeFirstName,
            employeeLastName: employee.employeeLastName,
            employeeEmail: employee.employeeEmail,
            departmentName: employee.department.departmentName,
            designationName: employee.designation.designationName,
            companyName: employee.company.companyName,
            actions: <><PageviewIcon color="primary" /> </>
          }
        });
        setRows(employessList);
      }
    }
    getEmployeesList();


  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Typography component="h2" variant="h6" className={classes.title} color="primary" gutterBottom>Employees List</Typography>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" component={Link} to='/addEmployee' color="primary" style={{ float: 'right', margin: '14px', backgroundColor: '#3D4A77' }}>Add Employee</Button>
        </Grid>
      </Grid>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(rows.length > 0) ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            }) : <TableRow>
                <TableCell colSpan={7} style={{ 'text-align': 'center' }}><Typography component="h2" variant="h6" className={classes.title} color="primary" gutterBottom>No records found.</Typography></TableCell></TableRow>}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default EmployeesList;