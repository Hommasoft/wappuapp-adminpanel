import { CHANGE_CITY, CHANGE_SORT, CHANGE_TYPE } from './types';

export const changeCity = city => {
  return async dispatch => {
    await dispatch({ type: CHANGE_CITY, cityId: city });
  };
};

export const changeSort = sortType => {
  return async dispatch => {
    await dispatch({ type: CHANGE_SORT, sort: sortType });
  };
};
export const changeType = feedType => {
  return async dispatch => {
    await dispatch({ type: CHANGE_TYPE, feedtype: feedType });
  };
};
