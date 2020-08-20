import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Typography, Divider, Grid, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import PageviewIcon from '@material-ui/icons/Pageview';
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
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Size\u00a0(km\u00b2)',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'density',
    label: 'Density',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  { id: 'actions', label: 'Actions', minWidth: 170, align: 'center' },
];

function createData(name, code, population, size, actions) {
  const density = population / size;
  return { name, code, population, size, density, actions };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263, <><PageviewIcon color="primary" /> {' '} <DeleteIcon color="secondary"/></>),
  createData('China', 'CN', 1403500365, 9596961 , <><PageviewIcon color="primary" /> {' '} <DeleteIcon color="secondary"/></>),
  createData('Italy', 'IT', 60483973, 301340 , <><PageviewIcon color="primary" /> {' '} <DeleteIcon color="secondary"/></>),
  createData('United States', 'US', 327167434, 9833520, <><PageviewIcon color="primary" /> {' '} <DeleteIcon color="secondary"/></>),
  createData('Canada', 'CA', 37602103, 9984670, <><PageviewIcon color="primary" /> {' '} <DeleteIcon color="secondary"/></>),
  createData('Australia', 'AU', 25475400, 7692024, <><PageviewIcon color="primary" /> {' '} <DeleteIcon color="secondary"/></>),
  createData('Germany', 'DE', 83019200, 357578, <><PageviewIcon color="primary" /> {' '} <DeleteIcon color="secondary"/></>),
  createData('Ireland', 'IE', 4857000, 70273, <><PageviewIcon color="primary" /> {' '} <DeleteIcon color="secondary"/></>),
  createData('Mexico', 'MX', 126577691, 1972550, <><PageviewIcon color="primary" /> {' '} <DeleteIcon color="secondary"/></>),
  createData('Japan', 'JP', 126317000, 377973, <><PageviewIcon color="primary" /> {' '} <DeleteIcon color="secondary"/></>),
  createData('France', 'FR', 67022000, 640679, <><PageviewIcon color="primary" /> {' '} <DeleteIcon color="secondary"/></>),
  createData('United Kingdom', 'GB', 67545757, 242495, <><PageviewIcon color="primary" /> {' '} <DeleteIcon color="secondary"/></>),
  createData('Russia', 'RU', 146793744, 17098246, <><PageviewIcon color="primary" /> {' '} <DeleteIcon color="secondary"/></>),
  createData('Nigeria', 'NG', 200962417, 923768, <><PageviewIcon color="primary" /> {' '} <DeleteIcon color="secondary"/></>),
  createData('Brazil', 'BR', 210147125, 8515767, <><PageviewIcon color="primary" /> {' '} <DeleteIcon color="secondary"/></>),
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
          <Typography component="h2" variant="h6" className={classes.title} color="primary" gutterBottom>Companies List</Typography>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" color="primary" style={{ float: 'right', margin: '14px', backgroundColor:'#3D4A77' }}>Add Company</Button>
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

export default EmployeesList;