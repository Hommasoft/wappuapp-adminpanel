import { SET_FEED, GET_FEED_REQUEST, GET_FEED_SUCCESS, GET_FEED_FAILURE } from '../actions/types';
import loadingStates from '../constants/loadingstates';

const initialState = {
  list: [],
  listState: loadingStates.NONE
};

export default function feed(state = initialState, action) {
  switch (action.type) {
    case SET_FEED:
      return state.set('list', action.feed);
    case GET_FEED_REQUEST:
      return state.set('listState', loadingStates.LOADING);
    case GET_FEED_SUCCESS:
      return state.set('listState', loadingStates.READY);
    case GET_FEED_FAILURE:
      return state.set('listState', loadingStates.FAILED);
    default:
      return state;
  }
}
