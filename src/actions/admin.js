import * as api from '../services/api';
import History from '../history';

import { GET_PROTECTED_DATA, MODLIST_ERROR } from './types';

export const getModlist = () => {
  return async dispatch => {
    try {
      const response = await api.get({ url: 'moderatorlist' });
      dispatch({ type: GET_PROTECTED_DATA, payload: response.data });
    } catch (err) {
      dispatch({ type: MODLIST_ERROR, payload: err });
      History.push('/moderatorlist');
    }
  };
};

export function demoteMod(id) {
  return async dispatch => {
    try {
      await api.put({ url: 'demote/' + id });
      History.push('/moderatorlist');
    } catch (err) {
      dispatch({ type: MODLIST_ERROR, payload: err });
      History.push('/moderatorlist');
    }
  };
}

export function promoteMod(id) {
  return async dispatch => {
    try {
      await api.put({ url: 'promote/' + id });
      History.push('/moderatorlist');
    } catch (err) {
      dispatch({ type: MODLIST_ERROR, payload: err });
      History.push('/moderatorlist');
    }
  };
}

export function deleteMod(id) {
  return async dispatch => {
    try {
      await api.del({ url: 'deletemoderator/' + id });
      History.push('/moderatorlist');
    } catch (err) {
      dispatch({ type: MODLIST_ERROR, payload: err });
      History.push('/moderatorlist');
    }
  };
}
