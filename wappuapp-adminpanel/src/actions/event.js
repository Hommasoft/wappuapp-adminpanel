import * as api from '../services/api';
import History from '../history';

import { EVENT_ERROR, GET_EVENTS } from './types';

export const addevent = ({
  name,
  location_name,
  start_time,
  end_time,
  organizer,
  contact_details,
  fb_event_id,
  description
}) => {
  return async dispatch => {
    try {
      const response = await api.post({
        url: 'addevent',
        data: {
          name,
          location_name,
          start_time,
          end_time,
          organizer,
          contact_details,
          fb_event_id,
          description
        }
      });
      History.push('/event');
    } catch (err) {
      dispatch(eventError(err));
    }
  };
};

export const getevents = ({ city_id }) => {
  return async dispatch => {
    try {
      const response = await api.get({ url: 'allevents/0' });
      dispatch({ type: GET_EVENTS, payload: response.data });
    } catch (err) {
      return err;
    }
  };
};

export const updateevent = ({ event }) => {
  const id = event.id;
  return async dispatch => {
    try {
      const response = await api.post({ url: 'updateevent/' + id });
      History.push('/event');
      dispatch({ type: GET_EVENTS, payload: response.data });
    } catch (err) {
      return err;
    }
  };
};

export const getevent = () => {
  const id = History.location.pathname.split('/')[2];
  return async dispatch => {
    try {
      const response = await api.get({ url: 'updateevent/' + id });
      dispatch({ type: GET_EVENTS, payload: response.data });
    } catch (err) {
      return err;
    }
  };
};

export const eventError = error => {
  return {
    type: EVENT_ERROR,
    payload: error
  };
};
