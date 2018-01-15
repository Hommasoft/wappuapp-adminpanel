import * as api from '../services/api';

import {
  GET_COMMENTS_REQUEST,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAILURE,
  SET_COMMENTS
} from './types';

const fetchComments = id => {
  return async dispatch => {
    try {
      dispatch({ type: GET_COMMENTS_REQUEST });
      const response = await api.get({ url: 'feed?parent_id=' + id });
      dispatch({ type: SET_COMMENTS, comments: response.data, open_id: id });
      dispatch({ type: GET_COMMENTS_SUCCESS });
    } catch (error) {
      dispatch({ type: GET_COMMENTS_FAILURE, error: true });
    }
  };
};

export { fetchComments };
