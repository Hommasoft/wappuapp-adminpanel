import React from 'react';
import { Route } from 'react-router-dom';

import App from '../App';
import RequireAuth from '../components/auth/requireauth';
import Login from '../components/auth/login';
import Logout from '../components/auth/logout';
import Register from '../components/auth/register';
import Protected from '../components/protected';
import FeedList from '../components/feed/feedlist';

const Routes = () => {
  return (
    <App>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/logout" component={Logout} />
      <Route exact path="/protected" component={RequireAuth(Protected)} />
      <Route exact path="/feed" component={FeedList} />
    </App>
  );
};

export default Routes;
