import { EVENT_ERROR } from '../actions/types';

export const reducer = (state = {}, action) => {
  switch (action.type) {
    case EVENT_ERROR:
      return { state, error: action.payload };
    default:
      return state;
  }
};
