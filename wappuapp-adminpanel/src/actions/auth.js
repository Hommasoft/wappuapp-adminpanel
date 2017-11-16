import * as api from '../services/api';
import History from '../history';

import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, GET_PROTECTED_DATA } from './types';

export const login = ({ username, password }) => {
  return async dispatch => {
    try {
      const response = await api.post({ url: 'login', data: { username, password } });
      localStorage.setItem('token', response.data.token);
      dispatch({ type: AUTH_USER });
      History.push('/protected');
    } catch (err) {
      dispatch(authError(err));
    }
  };
};

export const register = ({ username, email, password }) => {
  return async dispatch => {
    try {
      const response = await api.post({ url: 'register', data: { username, email, password } });
      localStorage.setItem('token', response.data.token);
      dispatch({ type: AUTH_USER });
      History.push('/protected');
    } catch (err) {
      dispatch(authError(err.error));
    }
  };
};

export const getProtectedData = () => {
  return async dispatch => {
    try {
      const response = await api.get({ url: 'protected' });
      dispatch({ type: GET_PROTECTED_DATA, payload: response.data });
    } catch (err) {
      return err;
    }
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  return { type: UNAUTH_USER };
};

export const authError = error => {
  return {
    type: AUTH_ERROR,
    payload: error
  };
};
