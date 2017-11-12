import React from 'react';
import { Route } from 'react-router-dom';

import App from '../App';
import RequireAuth from '../components/auth/requireauth';
import Login from '../components/auth/login';
import Logout from '../components/auth/logout';
import Register from '../components/auth/register';
import Protected from '../components/protected';

const Routes = () => {
  return (
    <App>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/logout" component={Logout} />
      <Route exact path="/protected" component={RequireAuth(Protected)} />
    </App>
  );
};

export default Routes;
