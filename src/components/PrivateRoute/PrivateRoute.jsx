import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute(props) {
  return localStorage.token ? <Route {...props}/> : <Redirect to="/admin/login"/>;
}

export default PrivateRoute;
