import axios from 'axios';

import History from '../history';

const Backend_URL = 'http://localhost:3001/api';

export async function post(endpoint, data) {
  try {
    const response = await axios.post(`${Backend_URL}/${endpoint}`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-user-uuid': 'web',
        authorization: localStorage.getItem('token')
      }
    });
    return response;
  } catch (err) {
    console.log(err); // Tästä tulee <unavailable>
    throw new Error(err);
  }
}

export async function get(endpoint) {
  try {
    const response = await axios.get(`${Backend_URL}/${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-user-uuid': 'web',
        authorization: localStorage.getItem('token')
      }
    });
    return response;
  } catch (err) {
    throw err;
  }
}
