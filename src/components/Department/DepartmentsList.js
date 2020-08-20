import React, { useEffect } from 'react';
import MaterialTable from 'material-table';

import useFetch from '../../hooks/useFetch';
import axios from 'axios';

const DepartmentsList = () => {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Department Id', field: 'departmentId', editable: 'never' },
      { title: 'Department Name', field: 'departmentName' }
    ],
    data: [],
  });
  const url = `department/getAllDepartmentsList`;
  const token = localStorage.getItem('authToken');
  const method = "GET";
  const { fetchData } = useFetch({ url, token, method })

  useEffect(() => {
    const getDepartmentsList = async () => {
      let departmentResponse = await fetchData();

      if (departmentResponse.length > 0) {
        departmentResponse = departmentResponse.map(department => {
          return {
            departmentId: department.departmentId,
            departmentName: department.departmentName
          }

        })
        setState({ ...state, data: departmentResponse })
      }
    }
    getDepartmentsList();


  }, []);

  const addDepartment = (newData) => {
    return new Promise((resolve, reject) => {
      if (newData.departmentName === '' || ((newData.departmentName).trim()).length === 0) {
        reject()
        return false;
      }
      axios.post(`https://organization-demo.herokuapp.com/department/createDepartment`, newData, {
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
            data.push({ departmentId: response.data.departmentId, departmentName: response.data.departmentName });
            return { ...prevState, data };
          });
        })
        .catch(err => console.log(err))
    })
  }

  const deleteDepartment = (department) => {
    return new Promise(async (resolve) => {
      try {
        await axios.delete(`https://organization-demo.herokuapp.com/department/deleteDepartmentById/${department.departmentId}`, {
          headers: {
            token: localStorage.getItem('authToken')
          }
        });
        const departmentList = await axios.get(`https://organization-demo.herokuapp.com/department/getAllDepartmentsList`, {
          headers: {
            token: localStorage.getItem('authToken')
          }
        })
        resolve();
        setState((prevState) => {
          console.log(departmentList.data)
          const data = departmentList.data;
          return { ...prevState, data };
        });

      } catch (error) {
        console.log(error)
      }
    })
  }
  return (
    <div style={{ minWidth: '100%' }}>
      <MaterialTable
        columns={state.columns}
        data={Array.from(state.data)}
        editable={{
          onRowAdd: addDepartment,
          onRowDelete: deleteDepartment

        }}
      />
    </div>
  )
}

export default DepartmentsList
