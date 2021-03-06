import {
  SET_FEED,
  GET_FEED_REQUEST,
  GET_FEED_SUCCESS,
  GET_FEED_FAILURE,
  REMOVE_FEED_ITEM,
  BAN_USER,
  UNBAN_USER,
  SET_CITIES,
  APPEND_FEED,
  GET_MORE_FEED_REQUEST,
  GET_MORE_FEED_SUCCESS
} from '../actions/types';
import loadingStates from '../constants/loadingstates';

const initialState = {
  feed: [],
  listState: loadingStates.NONE,
  cities: [],
  moreFeedButton: false
};

export const feed = (state = initialState, action) => {
  switch (action.type) {
    case SET_FEED:
      return Object.assign({}, state, {
        feed: action.feed
      });
    case GET_FEED_REQUEST:
      return Object.assign({}, state, {
        listState: loadingStates.LOADING
      });
    case GET_FEED_SUCCESS:
      return Object.assign({}, state, {
        listState: loadingStates.READY
      });
    case GET_FEED_FAILURE:
      return Object.assign({}, state, {
        listState: loadingStates.FAILED
      });
    case REMOVE_FEED_ITEM:
      return Object.assign({}, state, {
        feed: state.feed.filter(item => action.item !== item.id)
      });
    case BAN_USER:
      return Object.assign({}, state, {
        feed: state.feed.filter(item => action.uuid !== item.author.id)
      });
    case UNBAN_USER:
      return state;
    case SET_CITIES:
      return Object.assign({}, state, {
        cities: action.cities
      });
    case APPEND_FEED:
      return Object.assign({}, state, {
        feed: [...state.feed, ...action.feed]
      });
    case GET_MORE_FEED_REQUEST:
      return Object.assign({}, state, {
        moreFeedButton: true
      });
    case GET_MORE_FEED_SUCCESS:
      return Object.assign({}, state, {
        moreFeedButton: false
      });
    default:
      return state;
  }
};
