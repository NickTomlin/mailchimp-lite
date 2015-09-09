import API from './api';

export default class V2 extends API {
  prepareRequestOptions (endpoint, data = {}) {
    data.apikey = this.key;
    return {
      uri: `${this.apiRoot}${endpoint}.json`,
      body: data,
      json: true
    }
  }

  // mailchimp only supports POST
  // > All API calls should be made with HTTP POST.
  // https://apidocs.mailchimp.com/api/2.0/#rest-vs-rpc
  post(endpoint, data) {
    return this.request('post', endpoint, data);
  }
}
