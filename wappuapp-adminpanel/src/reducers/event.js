import { EVENT_ERROR, GET_EVENTS } from '../actions/types';

export const reducer = (state = {}, action) => {
  switch (action.type) {
    case GET_EVENTS:
      return { state, eventData: action.payload };
    case EVENT_ERROR:
      return { state, error: action.payload };
    default:
      return state;
  }
};
