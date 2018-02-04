import {
  CHANGE_CITY,
  CHANGE_SORT,
  CHANGE_TYPE,
  SET_REPORTS,
  CHANGE_TO_FEED,
  CHANGE_TO_REPORTS,
  RESOLVE_REPORT
} from '../actions/types';

const initialState = {
  city: 0,
  sort: 'new',
  type: '',
  reports: [],
  reportsVisible: false
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
    case SET_REPORTS:
      let items = action.reports[1].filter((elem, index, self) => {
        return (
          index ===
          self.findIndex(t => {
            return t.id === elem.id;
          })
        );
      });
      return Object.assign({}, state, {
        reports: items
      });
    case CHANGE_TO_FEED:
      return Object.assign({}, state, {
        reportsVisible: false
      });
    case CHANGE_TO_REPORTS:
      return Object.assign({}, state, {
        reportsVisible: true
      });
    case RESOLVE_REPORT:
      return Object.assign({}, state, {
        reports: state.reports.filter(item => action.id !== item.report_id)
      });
    default:
      return state;
  }
};
