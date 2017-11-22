import { SET_FEED, GET_FEED_REQUEST, GET_FEED_SUCCESS, GET_FEED_FAILURE } from '../actions/types';
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
    default:
      return state;
  }
};
