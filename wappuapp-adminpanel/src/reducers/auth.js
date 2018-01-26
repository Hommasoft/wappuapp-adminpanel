import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, CHANGEPW_ERROR, ADDMOD_ERROR } from '../actions/types';

export const reducer = (state = {}, action) => {
  switch (action.type) {
    case AUTH_USER:
      return { state, error: '', authenticated: true };
    case UNAUTH_USER:
      return { state, authenticated: false };
    case AUTH_ERROR:
      return { state, error: action.payload };
    case CHANGEPW_ERROR:
      return { state, error: action.payload, authenticated: true };
    case ADDMOD_ERROR:
      return { state, error: action.payload, authenticated: true };
    default:
      return state;
  }
};
