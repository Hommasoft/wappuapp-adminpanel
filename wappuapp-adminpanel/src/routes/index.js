import React from 'react';
import { Route } from 'react-router-dom';

import App from '../App';
import RequireAuth from '../components/auth/requireauth';
import Login from '../components/auth/login';
import Logout from '../components/auth/logout';
import Register from '../components/auth/register';
import Protected from '../components/protected';
import FeedList from '../components/feed/feedlist';
import ProtectedAdmin from '../components/protectedadmin';
import ModList from '../components/admin/moderatorlist';

const Routes = () => {
  return (
    <App>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/logout" component={Logout} />
      <Route exact path="/protected" component={RequireAuth(Protected)} />
      <Route exact path="/protectedadmin" component={RequireAuth(ProtectedAdmin)} />
      <Route exact path="/feed" component={RequireAuth(FeedList)} />
      <Route exact path="/moderatorlist" component={ModList} />
    </App>
  );
};

export default Routes;
