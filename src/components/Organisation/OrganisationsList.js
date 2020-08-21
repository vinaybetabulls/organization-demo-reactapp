import React, { useReducer, useEffect } from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Paper, TableRow, CircularProgress, TableHead, TableContainer, TableCell, TableBody, Table } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { green } from '@material-ui/core/colors';
import { Redirect } from 'react-router';
import useFetch from '../../hooks/useFetch';
import { reducer, initialState } from '../../reducers/OrganisationReducer';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  buttonProgress: {
    color: green[500],
    top: '45%',
    left: '50%',
    position: 'absolute'
  },
});

const OrganisationsList = () => {
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);
  const tableHeaders = ['OrgId', 'Name', 'CEO Name', 'Location'];
  const url = `organization/getAllOrganizationsList`;
  const token = localStorage.getItem('authToken');
  const method = "GET";
  const { response: organisations, isAuth, error, isLoading, fetchData } = useFetch({ url, token, method })

  useEffect(() => {
    fetchData();
    //dispatch({ type: "API_CALL_SUCCESS", payload: { organisations } })
  }, []);

  return (
    // (!isAuth) ? <Redirect to="/"/>:
      <div>
        <h3>Organisations List</h3>
        {(error) && <Alert severity="error">{error}</Alert>}
        {JSON.stringify(isAuth)}
        <TableContainer component={Paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>{tableHeaders.map((header, i) => <StyledTableCell key={i}>{header}</StyledTableCell>)}</TableRow>
            </TableHead>
            {(isLoading) && <CircularProgress size={50} className={classes.buttonProgress} />}
            <TableBody>
              {
              organisations && organisations.map((org, i) => {
                return <StyledTableRow key={i}>
                    <StyledTableCell>{org.orgId}</StyledTableCell>
                    <StyledTableCell>{org.orgName}</StyledTableCell>
                    <StyledTableCell>{org.orgCEO}</StyledTableCell>
                    <StyledTableCell>{org.orgLocation}</StyledTableCell>
                  </StyledTableRow>
                })
              }
            </TableBody>
          </Table>
        </TableContainer>
      </div>
  )
}

export default OrganisationsList
