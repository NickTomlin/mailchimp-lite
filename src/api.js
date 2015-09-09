import request from 'request';
import merge from 'lodash.merge';

export default class API {
  constructor({datacenter, key, version} = {}) {
    if (!key) { throw new Error('Mailchimp API Key Required'); }
    if (!datacenter) { throw new Error('Mailchimp DataCenter Required'); }
    if (!version) { throw new Error('Mailchimp Version Required'); }

    this.key = key;
    this.datacenter = datacenter;
    this.version = version;

    this.apiRoot = `https://${this.datacenter}.api.mailchimp.com/${this.version}`;
  }

  prepareRequestOptions () {}

  request(method, endpoint, data) {
    let requestOptions = merge({
      method,
      uri: `${this.apiRoot}${endpoint}`,
      body: data
    }, this.prepareRequestOptions(endpoint, data));

    if (data) { requestOptions.json = true; }

    return new Promise((resolve, reject) => {
      request(requestOptions, (err, res, body) => {
        if (err) {
          return reject(err);
        }

        if (res && res.statusCode >= 200 && res.statusCode < 300) {
          let parsedBody;
          try {
            parsedBody = JSON.parse(body)
          } catch (e) {
            parsedBody = {}
          }
          return resolve(parsedBody);
        }

        err = new Error(`Mailchimp Error: ${res.statusCode}`);
        err.response = res;

        reject(err);
      });
    });
  }
}
