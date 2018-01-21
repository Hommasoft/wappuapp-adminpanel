import { EVENT_ERROR, GET_EVENTS, GET_EVENT } from '../actions/types';

export const reducer = (state = {}, action) => {
  switch (action.type) {
    case GET_EVENTS:
      return { state, eventsData: action.payload };
    case GET_EVENT:
      return { state, eventData: action.payload };
    case EVENT_ERROR:
      return { state, error: action.payload };
    default:
      return state;
  }
};
