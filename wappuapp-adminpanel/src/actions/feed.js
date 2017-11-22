import * as api from '../services/api';

import { GET_FEED_REQUEST, GET_FEED_SUCCESS, GET_FEED_FAILURE, SET_FEED } from './types';

export const fetchFeed = () => {
  return async dispatch => {
    try {
      dispatch({ type: GET_FEED_REQUEST });
      const response = await api.get({ url: 'feed' });
      dispatch({ type: SET_FEED, feed: response.data });
      dispatch({ type: GET_FEED_SUCCESS });
    } catch (error) {
      dispatch({ type: GET_FEED_FAILURE, error: true, payload: error });
    }
  };
};
