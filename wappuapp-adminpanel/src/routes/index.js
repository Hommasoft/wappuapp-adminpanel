import React from 'react';
import { Route } from 'react-router-dom';

import App from '../App';
import RequireAuth from '../components/auth/requireauth';
import Login from '../components/auth/login';
import Logout from '../components/auth/logout';
import Register from '../components/auth/register';
import FeedList from '../components/feed/feedlist';
import ModList from '../components/admin/moderatorlist';
import ActivateAccount from '../components/auth/activateaccount';
import Front from '../components/front';
import AccountPage from '../components/auth/accountpage';
import Events from '../components/events/event';
import AddEvent from '../components/events/addevent';
import UpdateEvent from '../components/events/updateevent';

const Routes = () => {
  return (
    <App>
      <Route exact path="/" component={Front} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/activateaccount" component={ActivateAccount} />
      <Route exact path="/register" component={RequireAuth(Register)} />
      <Route exact path="/logout" component={Logout} />
      <Route exact path="/feed" component={RequireAuth(FeedList)} />
      <Route exact path="/moderatorlist" component={RequireAuth(ModList)} />
      <Route exact path="/account" component={RequireAuth(AccountPage)} />
      <Route exact path="/event" component={RequireAuth(Events)} />
      <Route exact path="/addevent" component={RequireAuth(AddEvent)} />
      <Route exact path="/updateevent/:id" component={RequireAuth(UpdateEvent)} />
    </App>
  );
};

export default Routes;
