import { GET_PROTECTED_DATA, MODLIST_ERROR } from '../actions/types';

export const reducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PROTECTED_DATA:
      return { state, protectedData: action.payload };
    case MODLIST_ERROR:
      return { state, error: action.payload };
    default:
      return state;
  }
};
