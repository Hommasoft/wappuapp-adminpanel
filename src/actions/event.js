import * as api from '../services/api';
import History from '../history';

import { EVENT_ERROR, GET_EVENTS, GET_EVENT } from './types';

export const addevent = ({
  code,
  name,
  location_name,
  start_time,
  end_time,
  organizer,
  contact_details,
  fb_event_id,
  description,
  show,
  teemu,
  city_id,
  location
}) => {
  return async dispatch => {
    try {
      await api.post({
        url: 'addevent',
        data: {
          code,
          name,
          location_name,
          start_time,
          end_time,
          organizer,
          contact_details,
          fb_event_id,
          description,
          show,
          teemu,
          city_id,
          location
        }
      });
      History.push('/event/0');
    } catch (err) {
      dispatch(eventError(err));
    }
  };
};

export const getevents = () => {
  const id = History.location.pathname.split('/')[2];
  return async dispatch => {
    try {
      const response = await api.get({ url: 'allevents/' + id });
      dispatch({ type: GET_EVENTS, payload: response.data });
    } catch (err) {
      dispatch(eventError(err));
    }
  };
};

export function deleteevent(id) {
  return async dispatch => {
    try {
      await api.del({ url: 'deleteevent/' + id });
      History.push('/event/0');
    } catch (err) {
      dispatch(eventError(err));
    }
  };
}

export const updateevent = ({
  id,
  code,
  name,
  location_name,
  start_time,
  end_time,
  organizer,
  contact_details,
  fb_event_id,
  description,
  show,
  teemu,
  city_id,
  location
}) => {
  return async dispatch => {
    try {
      await api.post({
        url: 'updateevent/' + id,
        data: {
          code,
          name,
          location_name,
          start_time,
          end_time,
          organizer,
          contact_details,
          fb_event_id,
          description,
          show,
          teemu,
          city_id,
          location
        }
      });
      History.push('/event/0');
    } catch (err) {
      dispatch(eventError(err));
    }
  };
};

export const getevent = () => {
  const id = History.location.pathname.split('/')[2];
  return async dispatch => {
    try {
      const response = await api.get({ url: 'updateevent/' + id });
      dispatch({ type: GET_EVENT, payload: response.data[0] });
    } catch (err) {
      dispatch(eventError(err));
    }
  };
};

export const eventError = error => {
  return {
    type: EVENT_ERROR,
    payload: error
  };
};
