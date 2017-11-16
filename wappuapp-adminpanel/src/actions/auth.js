import * as api from '../services/api';

import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, GET_PROTECTED_DATA } from './types';

export const login = ({ username, password }) => {
  return async dispatch => {
    function success(response) {
      dispatch({ type: AUTH_USER });
      localStorage.setItem('token', response.data.token);
      History.push('/protected');
      return success;
    }
    function error(err) {
      console.log(err);
      dispatch(authError(err));
      return error;
    }
    try {
      const response = await api.post('login', { username, password });
      return success(response);
    } catch (err) {
      return error(err);
    }
  };
};

export const register = ({ username, email, password }) => {
  return async dispatch => {
    function success(response) {
      dispatch({ type: AUTH_USER });
      localStorage.setItem('token', response.data.token);
      History.push('/protected');
      return success;
    }
    function error(err) {
      dispatch(authError(err));
      return error;
    }
    try {
      const response = await api.post('register', { username, email, password });
      return success(response);
    } catch (err) {
      return error(err);
    }
  };
};

export const getProtectedData = () => {
  return async dispatch => {
    try {
      const response = await api.get('protected');
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
