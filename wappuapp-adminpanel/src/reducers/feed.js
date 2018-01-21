import {
  SET_FEED,
  GET_FEED_REQUEST,
  GET_FEED_SUCCESS,
  GET_FEED_FAILURE,
  REMOVE_FEED_ITEM,
  BAN_USER,
  UNBAN_USER
} from '../actions/types';
import loadingStates from '../constants/loadingstates';

const initialState = {
  feed: [],
  listState: loadingStates.NONE
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
      return {
        feed: state.feed.filter(item => action.item !== item.id)
      };
    case BAN_USER:
      return {
        feed: state.feed.filter(item => action.uuid !== item.author.id)
      };
    case UNBAN_USER:
      return state;
    default:
      return state;
  }
};
