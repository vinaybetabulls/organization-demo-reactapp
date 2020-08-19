import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Registration from '../components/user-onborading/Registration';
import Login from '../components/user-onborading/Login';
import CompaniesList from '../components/Company/CompaniesList';
import DepartmentsList from '../components/Department/DepartmentsList';
import DesignationsList from '../components/Designation/DesignationsList';
import EmployeesList from '../components/Employee/EmployeesList';
import OrganisationsList from '../components/Organisation/OrganisationsList';
import AddOrganisation from '../components/Organisation/AddOrganisation';

const Routes = () => (
  <Switch>
    <Route path="/register" component={Registration} />
    <Route exact path="/" component={Login} />
    <Route path="/organisation" component={OrganisationsList} />
    <Route path="/companies" component={CompaniesList} />
    <Route path="/employees" component={EmployeesList} />
    <Route path="/department" component={DepartmentsList} />
    <Route path="/designation" component={DesignationsList} />
    <Route path="/addorg" component={AddOrganisation} />
  </Switch>
);

export default Routes; 