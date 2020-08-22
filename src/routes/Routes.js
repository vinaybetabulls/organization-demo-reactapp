import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Registration from '../components/user-onborading/Registration';
import Login from '../components/user-onborading/Login';
import CompaniesList from '../components/Company/CompaniesList';
import DepartmentsList from '../components/Department/DepartmentsList';
import DesignationsList from '../components/Designation/DesignationsList';
import EmployeesList from '../components/Employee/EmployeesList';
import AddEmployee from '../components/Employee/AddEmployee';
import OrganisationsList from '../components/Organisation/OrganisationsList';
import AddOrganisation from '../components/Organisation/AddOrganisation';
import Dashboard from '../components/dashboard';
import ProtectRoute from './ProtectRote';
import AddCompany from '../components/Company/AddCompany';

const Routes = () => (
  <Switch>
      <Route path="/register" component={Registration} />
      <Route exact path="/" component={Login} />
      <ProtectRoute exact path='/organisation' component={OrganisationsList} />
      <ProtectRoute exact path='/companies' component={CompaniesList} />
      <ProtectRoute exact path='/employees' component={EmployeesList} />
      <ProtectRoute exact path='/addEmployee' component={AddEmployee} />
      <ProtectRoute exact path='/department' component={DepartmentsList} />
      <ProtectRoute exact path='/designation' component={DesignationsList} />
      <ProtectRoute exact path='/addorg' component={AddOrganisation} />
      <ProtectRoute exact path='/dashboard' component={Dashboard} />
      {/*<Route path="/test" component={Test}/>*/}
      <ProtectRoute exact path="/addcomp" component={AddCompany} />
  </Switch>
);

export default Routes; 
