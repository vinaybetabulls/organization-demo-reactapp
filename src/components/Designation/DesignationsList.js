import React, { useEffect } from 'react';
import MaterialTable from 'material-table';
import { Alert } from '@material-ui/lab';

import axios from 'axios';

import useFetch from '../../hooks/useFetch';
// import { reducer, initialState } from '../../reducers/DesignationReducer';

export default function DesignationsList() {

  // const [state1, dispatch] = useReducer(reducer, initialState);
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
          console.log('newData', newData);
          resolve()
          setState((prevState) => {
            console.log('..prevState add data..', prevState)
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
        title='Designation List'
        columns={state.columns}
        data={Array.from(state.data)}
        editable={{
          onRowAdd: addDesignation,
          onRowDelete: deleteDesignation

        }}
      />
    </div>
  );
}
