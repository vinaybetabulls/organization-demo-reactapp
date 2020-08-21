import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Typography, Divider, Button, Grid } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
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
  { id: 'companyId', label: 'Company Id', minWidth: 170 },
  { id: 'companyName', label: 'Company Name', minWidth: 100 },
  {
    id: 'companyLocation',
    label: 'Company Location',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'orgName',
    label: 'Organisation',
    minWidth: 170,
    align: 'right',
  },
  { id: 'actions', label: 'Actions', minWidth: 170, align: 'center' },
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

const CompaniesList = () => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const url = `company/getAllCompaniesList`;
  const token = localStorage.getItem('authToken');
  const method = "GET";
  const { response: companies, isAuth, error, isLoading, fetchData } = useFetch({ url, token, method })

  useEffect(() => {
    const getAllCompanies = async () => {
      let res = await fetchData();
      res = res.map(cmp => {
        return {companyName: cmp.companyName,
          companyId: cmp.companyId,
          companyLocation: cmp.companyLocation,
          orgName: cmp.organization.orgName,
          actions: <PageviewIcon color="primary" />
        }
      })
      setRows(res);
    }
    getAllCompanies()
  }, []);

  return (
    <Paper className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Typography component="h2" variant="h6" className={classes.title} color="primary" gutterBottom>Companies List</Typography>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" color="primary" style={{ float: 'right', margin: '14px', backgroundColor:'#3D4A77' }} component={Link} to='/addcomp'>Add Company</Button>
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
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
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
            })}
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

export default CompaniesList;