import axios from 'axios';

import History from '../history';

import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, GET_PROTECTED_DATA } from './types';

const Backend_URL = 'http://localhost:3001/api';

export const login = ({ username, password }) => {
  return dispatch => {
    axios
      .post(
        `${Backend_URL}/login`,
        { username: username, password: password },
        { headers: { 'Content-Type': 'application/json', 'x-user-uuid': 'web' } }
      )
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        History.push('/protected');
      })
      .catch(() => {
        dispatch(authError('Login failed'));
      });
  };
};

export const register = ({ username, email, password }) => {
  return dispatch => {
    axios
      .post(
        `${Backend_URL}/register`,
        { username, email, password },
        { headers: { 'Content-Type': 'application/json', 'x-user-uuid': 'web' } }
      )
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        History.push('/protected');
      })
      .catch(err => {
        dispatch(authError(err.response.data.error));
      });
  };
};

export const getProtectedData = () => {
  return dispatch => {
    axios
      .get(`${Backend_URL}/protected`, {
        headers: {
          'Content-Type': 'application/json',
          'x-user-uuid': 'web',
          authorization: localStorage.getItem('token')
        }
      })
      .then(response => {
        dispatch({
          type: GET_PROTECTED_DATA,
          payload: response.data
        });
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
