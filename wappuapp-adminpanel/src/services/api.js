import Endpoints from '../constants/Endpoints';
import { version as VERSION_NUMBER } from '../../package.json';
import * as ENV from '../../env';

const fetchModels = (modelType, params) => {
  let url = Endpoints.urls[modelType];

  if (!isEmpty(params) && isObject(params)) {
    url +=
      '?' +
      Object.keys(params)
        .map(k => {
          return params[k] ? encodeURIComponent(k) + '=' + encodeURIComponent(params[k]) : '';
        })
        .join('&');
  }

  return cachedFetch(url);
};

const fetchMoreFeed = (beforeId, params) => {
  const extendedParams = Object.assign({ beforeId, limit: 20 }, params);

  let url = Endpoints.urls.feed;
  url +=
    '?' +
    Object.keys(extendedParams)
      .map(k => {
        return encodeURIComponent(k) + '=' + encodeURIComponent(extendedParams[k]);
      })
      .join('&');

  return cachedFetch(url);
};

const cachedFetch = (url, opts) => {
  return wapuFetch(url, opts)
    .then(response => {
      // If server responds with error, it is thrown
      if (isErrorResponse(response.status)) {
        const error = new Error(response.statusText);
        error.response = response;
        error.status = response.status;
        throw error;
      }

      return response.json();
    }) /*
    .then(response => {
      return AsyncStorage.setItem(url, JSON.stringify(response))
        .then(() => response);
    })*/
    .catch(error => {
      if (error.response) {
        // Re-throw server errors
        throw error;
      }

      // In case of a network failure, return data from cache
      console.log('Error catched on API-fetch', error);
      /*
      return AsyncStorage.getItem(url)
      .then(value => {
        value = JSON.parse(value);
        if (value != null && !value.error) {
          return Promise.resolve(value);
        } else {
          return Promise.reject(null);
        }
      });
      */
    });
};

const wapuFetch = (url, opts) => {
  opts = opts || {};
  opts.headers = opts.headers || {};

  opts.headers['x-client-version'] = VERSION_NUMBER;
  //opts.headers['x-user-uuid'] = USER_UUID;
  opts.headers['x-token'] = API_TOKEN;
  return fetch(url, opts);
};

export default {
  fetchModels,
  fetchMoreFeed
};
