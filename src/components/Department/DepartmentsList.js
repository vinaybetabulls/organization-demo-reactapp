import React, { useEffect, forwardRef } from 'react';
import MaterialTable from 'material-table';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
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

  const tableIcons = { Add: forwardRef((props, ref) => <Button ref={ref} variant="contained"  color="primary" style={{ float: 'right', backgroundColor: '#3D4A77' }}>Add Department</Button>), }

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
          resolve()
          setState((prevState) => {
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
        icons={tableIcons}
        title='Department List'
        columns={state.columns}
        data={Array.from(state.data)}
        options={{
          search: false,
          headerStyle: { backgroundColor: '#3D4A77', color: '#FFF' },
          actionsColumnIndex: -1
        }}
        editable={{
          onRowAdd: addDepartment,
        }}
        actions={[rowData => ({ icon: 'delete', tooltip: 'Delete Department', onClick: (event, rowData) => deleteDepartment(rowData), })]}
      />
    </div>
  )
}

export default DepartmentsList
