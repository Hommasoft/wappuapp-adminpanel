import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { BrowserRouter, Router, Switch } from 'react-router-dom';

import History from './history';
import Routes from './routes';
import { AUTH_USER } from './actions/types';
import rootReducer from './reducers';
import './assets/css/index.css';
import registerServiceWorker from './registerServiceWorker';

const createStoreWithMiddleWare = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleWare(rootReducer);

const token = localStorage.getItem('token');

if (token) {
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Router history={History}>
        <Switch>
          <Routes />
        </Switch>
      </Router>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
