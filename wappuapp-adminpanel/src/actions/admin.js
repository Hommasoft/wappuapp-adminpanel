import * as api from '../services/api';
import History from '../history';

import { GET_PROTECTED_DATA } from './types';

export const getModlist = () => {
  return async dispatch => {
    try {
      const response = await api.get({ url: 'moderatorlist' });
      dispatch({ type: GET_PROTECTED_DATA, payload: response.data });
      console.log('asd');
    } catch (err) {
      return err;
    }
  };
};
