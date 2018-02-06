import * as api from '../services/api';

import {
  GET_FEED_REQUEST,
  GET_FEED_SUCCESS,
  GET_FEED_FAILURE,
  SET_FEED,
  REMOVE_FEED_ITEM,
  BAN_USER,
  UNBAN_USER,
  SET_CITIES,
  APPEND_FEED,
  GET_MORE_FEED_REQUEST,
  GET_MORE_FEED_SUCCESS
} from './types';

const fetchFeed = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: GET_FEED_REQUEST });
      let cityId = '?cityId=' + getState().filters.city.id;
      let sort = '&sort=' + getState().filters.sort.toLowerCase();
      let type;
      if (getState().filters.type === 'Type') {
        type = '';
      } else {
        type = '&type=' + getState().filters.type;
      }
      const response = await api.get({ url: 'feed' + cityId + sort + type });
      dispatch({ type: SET_FEED, feed: response.data });
      dispatch({ type: GET_FEED_SUCCESS });
    } catch (error) {
      dispatch({ type: GET_FEED_FAILURE, error: true, payload: error });
    }
  };
};

const fetchMoreFeed = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: GET_MORE_FEED_REQUEST });
      let cityId = '?cityId=' + getState().filters.city.id;
      let sort = '&sort=' + getState().filters.sort.toLowerCase();
      let type;
      if (getState().filters.type === 'Type') {
        type = '';
      } else {
        type = '&type=' + getState().filters.type;
      }
      let lastId = '&beforeId=' + getState().feed.feed[getState().feed.feed.length - 1].id;
      const response = await api.get({ url: 'feed' + cityId + lastId + sort + type });
      dispatch({ type: APPEND_FEED, feed: response.data });
      dispatch({ type: GET_MORE_FEED_SUCCESS });
    } catch (error) {
      dispatch({ type: GET_MORE_FEED_SUCCESS });
      console.log(error);
    }
  };
};

const fetchCities = () => {
  return async dispatch => {
    try {
      const response = await api.get({ url: 'cities' });
      dispatch({ type: SET_CITIES, cities: response.data });
    } catch (error) {
      console.log(error);
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

export { fetchFeed, removeFeedItem, banUser, unbanUser, fetchCities, fetchMoreFeed };
