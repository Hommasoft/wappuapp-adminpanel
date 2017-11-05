import axios from 'axios';

import History from '../history';

import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from './types';

const Backend_URL = 'http://localhost:9000';

export const login = ({ username, password }) => {
  return dispatch => {
    axios
      .post(`${Backend_URL}/login`, { username, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        History.push('/');
      })
      .catch(() => {
        dispatch(authError('Login failed'));
      });
  };
};

export const register = ({ username, email, password }) => {
  return dispatch => {
    axios
      .post(`${Backend_URL}/register`, { username, email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        History.push('/');
      })
      .catch(err => {
        dispatch(authError(err.response.data.error));
      });
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
