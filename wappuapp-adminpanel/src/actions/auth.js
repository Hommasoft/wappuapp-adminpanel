import * as api from '../services/api';
import History from '../history';

import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from './types';

export const login = ({ email, password }) => {
  return async dispatch => {
    try {
      const response = await api.post({ url: 'login', data: { email, password } });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('admin', response.data.admin);
      localStorage.setItem('activated', response.data.activated);
      localStorage.setItem('email', response.data.email);
      dispatch({ type: AUTH_USER });
      History.push('/feed');
    } catch (err) {
      dispatch(authError(err));
    }
  };
};

export const addmoderator = ({ email }) => {
  return async dispatch => {
    try {
      await api.post({ url: 'addmoderator', data: { email } });
      History.push('/moderatorlist');
    } catch (err) {
      dispatch(authError(err));
    }
  };
};

export const changepassword = ({ newpassword, oldpassword }) => {
  return async dispatch => {
    try {
      await api.post({ url: 'changepassword', data: { newpassword, oldpassword } });
      History.push('/account');
    } catch (err) {
      dispatch(authError(err));
    }
  };
};

export const activateaccount = ({ password }) => {
  const token = History.location.search.substr(7);
  if (token) {
    localStorage.setItem('token', token);
  }
  return async dispatch => {
    try {
      await api.post({ url: 'activateaccount', data: { password } });
      History.push('/logout');
    } catch (err) {
      dispatch(authError(err));
    }
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('admin');
  localStorage.removeItem('email');
  localStorage.removeItem('activated');
  History.push('/');
  return { type: UNAUTH_USER };
};

export const authError = error => {
  return {
    type: AUTH_ERROR,
    payload: error
  };
};
