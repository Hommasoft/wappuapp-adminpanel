import { CHANGE_CITY, CHANGE_SORT, CHANGE_TYPE } from '../actions/types';

const initialState = {
  city: 0,
  sort: 'new',
  type: ''
};

export const filters = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CITY:
      return Object.assign({}, state, {
        city: action.cityId
      });
    case CHANGE_SORT:
      return Object.assign({}, state, {
        sort: action.sort
      });
    case CHANGE_TYPE:
      return Object.assign({}, state, {
        type: action.feedtype
      });
    default:
      return state;
  }
};
