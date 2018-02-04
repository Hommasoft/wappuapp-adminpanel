import * as api from '../services/api';

import {
  CHANGE_CITY,
  CHANGE_SORT,
  CHANGE_TYPE,
  SET_REPORTS,
  CHANGE_TO_REPORTS,
  CHANGE_TO_FEED,
  RESOLVE_REPORT
} from './types';

export const fetchReports = () => {
  return async dispatch => {
    try {
      const response = await api.get({ url: 'admin/reports' });
      dispatch({ type: SET_REPORTS, reports: response.data });
      dispatch({ type: CHANGE_TO_REPORTS });
    } catch (error) {
      console.log(error);
    }
  };
};

export const sendSystemMsg = msg => {
  return async dispatch => {
    try {
      await api.post({ url: 'admin/actions', data: { text: msg, user: 'web', type: 'TEXT' } });
    } catch (error) {
      console.log(error);
    }
  };
};

export const resolveReport = report_id => {
  return async dispatch => {
    try {
      await api.put({ url: 'admin/reports/' + report_id, data: { banned: false } });
      dispatch({ type: RESOLVE_REPORT, id: report_id });
    } catch (error) {
      console.log(error);
    }
  };
};

export const changeToFeed = () => {
  return async dispatch => {
    await dispatch({ type: CHANGE_TO_FEED });
  };
};

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
