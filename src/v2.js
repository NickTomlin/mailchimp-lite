import superagent from 'superagent';
import API from './api';

export default class V2 extends API {
  constructor (...args) {
    super(...args);
    this.apiRoot = `https://${this.datacenter}.api.mailchimp.com/2.0`;
  }

  request (method, endpoint, data = {}) {
    // this would be great for a "prepareRequest" hook
    data.apikey = this.key;
    return new Promise((resolve, reject) => {
      let request = superagent[method](`${this.apiRoot}/${endpoint}.json`);
      request.send(data);

      if (err) {
        if (err.response && Object.keys(err.response.body).length > 0) {
          return reject(err.response.body)
        } else {
          return reject(err);
        }
      }

      resolve(response.body);
    });
  }

  get(endpoint) {
    return this.request('get', endpoint);
  }

  post(endpoint, data) {
    return this.request('post', endpoint, data);
  }

  delete(endpoint, data) {
    return this.request('del', endpoint, data);
  }

  put(endpoint, data) {
    return this.request('put', endpoint, data);
  }

  patch(endpoint, data) {
    return this.request('patch', endpoint, data);
  }

  batchSubscribe(endpoint, data) {
    return this.request('post', endpoint, data);
  }
}
