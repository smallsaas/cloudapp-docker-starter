import { query, post, update, remove } from 'zero-element/lib/utils/request';
import { error } from 'zero-element/lib/utils/request/axios';
import { message } from 'antd';

function requestWrapped(method, api, payload, options = {}) {
  const {
    message: optMsg = '操作成功'
  } = options;
  const mh = {
    get: query,
    post: post,
    put: update,
    remove: remove
  };
  return mh[method](api, payload).then(response => {
    const {
      status,
      data
    } = response;

    if (status === 200 && data.code === 200) {
      if (method !== 'get' && optMsg) {
        message.success(optMsg);
      }

      return Promise.resolve(data.data);
    }

    return Promise.reject(data.data);
  }).catch(error);
}
/**
 *
 *
 * @param {string} api
 * @param {object} payload
 * @returns Promise
 */


function queryWrapped(...args) {
  return requestWrapped('get', ...args);
}

function postWrapped(...args) {
  return requestWrapped('post', ...args);
}

function updateWrapped(...args) {
  return requestWrapped('put', ...args);
}

function removeWrapped(...args) {
  return requestWrapped('remove', ...args);
}

export { queryWrapped as query, postWrapped as post, updateWrapped as update, removeWrapped as remove };