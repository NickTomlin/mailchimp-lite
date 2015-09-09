import API from './api';

export default class V3 extends API {
  prepareRequestOptions() {
    return {
      auth: {
        username: 'apikey',
        password: this.key
      }
    }
  }

  get(endpoint) {
    return this.request('get', endpoint);
  }

  post(endpoint, data) {
    return this.request('post', endpoint, data);
  }

  delete(endpoint, data) {
    return this.request('delete', endpoint, data);
  }

  put(endpoint, data) {
    return this.request('put', endpoint, data);
  }

  patch(endpoint, data) {
    return this.request('patch', endpoint, data);
  }
}
