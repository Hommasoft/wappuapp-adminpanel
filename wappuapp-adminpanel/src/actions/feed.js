import * as api from '../services/api';

import {
  GET_FEED_REQUEST,
  GET_FEED_SUCCESS,
  GET_FEED_FAILURE,
  SET_FEED,
  REMOVE_FEED_ITEM,
  BAN_USER,
  UNBAN_USER
} from './types';

const fetchFeed = () => {
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

const removeFeedItem = id => {
  return async dispatch => {
    try {
      await api.put({ url: 'admin/feed/' + id });
      dispatch({ type: REMOVE_FEED_ITEM, item: id });
    } catch (error) {
      console.log(error);
    }
  };
};

const banUser = uuid => {
  return async dispatch => {
    try {
      await api.put({ url: 'admin/users/' + uuid + '/ban' });
      dispatch({ type: BAN_USER, uuid: uuid });
    } catch (error) {
      console.log(error);
    }
  };
};

const unbanUser = uuid => {
  return async dispatch => {
    try {
      await api.put({ url: 'admin/users/' + uuid + '/unban' });
      dispatch({ type: UNBAN_USER, uuid: uuid });
    } catch (error) {
      console.log(error);
    }
  };
};

export { fetchFeed, removeFeedItem, banUser, unbanUser };
