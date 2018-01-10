import {
  GET_COMMENTS_REQUEST,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAILURE,
  SET_COMMENTS
} from '../actions/types';
import loadingStates from '../constants/loadingstates';

const initialState = {
  comments: [],
  listState: loadingStates.NONE,
  visibleComment: undefined
};

export const comments = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMMENTS:
      return Object.assign({}, state, {
        comments: action.comments,
        visibleComment: action.open_id
      });
    case GET_COMMENTS_REQUEST:
      return Object.assign({}, state, {
        listState: loadingStates.LOADING
      });
    case GET_COMMENTS_SUCCESS:
      return Object.assign({}, state, {
        listState: loadingStates.READY
      });
    case GET_COMMENTS_FAILURE:
      return Object.assign({}, state, {
        listState: loadingStates.FAILED
      });
    default:
      return state;
  }
};
