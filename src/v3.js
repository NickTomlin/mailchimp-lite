import API from './api';

export default class MailChimpConnector extends API {
  constructor (...args) {
    super(...args);
    this.apiRoot = `https://${this.datacenter}.api.mailchimp.com/3.0`;
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
}
