import axios from 'axios';

const baseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:9000/api'
    : process.env.REACT_APP_BACKEND_URI;

console.log(baseUrl);

const api = axios.create({
  baseURL: baseUrl
});

const request = async (method, opts) => {
  const req = {
    method,
    url: opts.url,
    data: opts.data,
    headers: {
      'Content-Type': 'application/json',
      'x-user-uuid': 'web',
      authorization: localStorage.getItem('token')
    }
  };
  try {
    const response = await api.request(req);
    return response;
  } catch (err) {
    throw err.response.data;
  }
};

export const get = async opts => request('get', { url: opts.url });

export const put = async opts => request('put', { url: opts.url });

export const post = async opts => request('post', opts);

export const del = async opts => request('delete', opts);
