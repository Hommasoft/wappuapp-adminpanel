import * as api from '../services/api';
import History from '../history';

import { EVENT_ERROR } from './types';

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

export const eventError = error => {
  return {
    type: EVENT_ERROR,
    payload: error
  };
};
