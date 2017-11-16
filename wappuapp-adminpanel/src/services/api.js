import axios from 'axios';

const buildHeaders = () =>
  Object.assign({
    'Content-Type': 'application/json',
    'x-user-uuid': 'web',
    authorization: localStorage.getItem('token')
  });

const api = axios.create({
  baseURL: '/api'
});

const request = async (method, opts) => {
  const req = {
    method,
    url: opts.url,
    params: opts.params,
    data: opts.data,
    headers: buildHeaders
  };
  try {
    const response = await api.request(req);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const get = async opts => request('get', { url: opts.url, params: opts.params });

export const post = async opts => request('post', opts);

export const del = async opts => request('delete', opts);
