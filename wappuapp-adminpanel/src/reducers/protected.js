import { GET_PROTECTED_DATA } from '../actions/types';

export const reducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PROTECTED_DATA:
      return { state, protectedData: action.payload };
    default:
      return state;
  }
};
