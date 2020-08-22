import React, { useEffect, forwardRef } from 'react';
import MaterialTable from 'material-table';
import { Alert } from '@material-ui/lab';
import Button from '@material-ui/core/Button';

import axios from 'axios';

import useFetch from '../../hooks/useFetch';

export default function DesignationsList() {

  const [state, setState] = React.useState({
    columns: [
      { title: 'Designation Id', field: 'designationId', editable: 'never' },
      { title: 'Designation Name', field: 'designationName' }
    ],
    data: [],
  });

  const url = `designation/getAllDesignationsList`;
  const token = localStorage.getItem('authToken');
  const method = "GET";
  const { fetchData, error } = useFetch({ url, token, method })

  useEffect(() => {
    const getDesignation = async () => {
      let desg = await fetchData();

      if (desg.length > 0) {
        desg = desg.map(designation => {
          return {
            designationId: designation.designationId,
            designationName: designation.designationName
          }

        })
        setState({ ...state, data: desg })
      }
    }
    getDesignation();


  }, []);

  const tableIcons = { Add: forwardRef((props, ref) => <Button ref={ref} variant="contained"  color="primary" style={{ float: 'right', backgroundColor: '#3D4A77' }}>Add Designation</Button>), }

  const addDesignation = (newData) => {
    return new Promise((resolve, reject) => {
      if (newData.designationName === '' || ((newData.designationName).trim()).length === 0) {
        reject()
        return false;
      }
      axios.post(`https://organization-demo.herokuapp.com/designation/createDesignation`, newData, {
        headers: {
          token: localStorage.getItem('authToken')
        }
      })
        .then((response) => {
          resolve()
          setState((prevState) => {
            const data = [...prevState.data];
            data.push({ designationId: response.data.designationId, designationName: response.data.designationName });
            return { ...prevState, data };
          });
        })
        .catch(err => console.log(err))
    })
  }

  const deleteDesignation = (desgination) => {
    return new Promise(async (resolve) => {
      try {
        await axios.delete(`https://organization-demo.herokuapp.com/designation/deleteDesignationById/${desgination.designationId}`, {
          headers: {
            token: localStorage.getItem('authToken')
          }
        });

        const designationList = await axios.get(`https://organization-demo.herokuapp.com/designation/getAllDesignationsList`, {
          headers: {
            token: localStorage.getItem('authToken')
          }
        })
        resolve();
        setState((prevState) => {
          console.log(designationList.data)
          const data = designationList.data;
          return { ...prevState, data };
        });

      } catch (error) {
        console.log(error)
      }
    })
  }

  return (

    <div style={{ minWidth: '100%' }}>
      {(error) && <Alert severity="error">{error}</Alert>}
      <MaterialTable
        icons={tableIcons}
        title='Designation List'
        columns={state.columns}
        data={Array.from(state.data)}
        options={{
          search: false,
          headerStyle: { backgroundColor: '#3D4A77', color: '#FFF' },
          actionsColumnIndex: -1
        }}
        editable={{
          onRowAdd: addDesignation,
        }}
        actions={[rowData => ({ icon: 'delete', tooltip: 'Delete Designation', onClick: (event, rowData) => deleteDesignation(rowData), })]}
      />
    </div>
  );
}
