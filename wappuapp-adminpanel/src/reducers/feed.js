import {
  SET_FEED,
  GET_FEED_REQUEST,
  GET_FEED_SUCCESS,
  GET_FEED_FAILURE,
  REMOVE_FEED_ITEM
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
      let orgFeed = state.feed;
      const index = orgFeed.findIndex(element => element.id === action.item);
      if (index < 0) {
        return state;
      } else {
        orgFeed.splice(index, 1);
        return { state, feed: orgFeed };
      }
    default:
      return state;
  }
};
