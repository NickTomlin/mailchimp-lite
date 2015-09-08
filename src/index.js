import superagent from 'superagent';

export default class MailChimpConnector {
  constructor (options) {
    if (!options.key) { throw new Error('Mailchimp API Key Required') }
    if (!options.datacenter) { throw new Error('Mailchimp DataCenter Required') }

    this.key = options.key;
    this.datacenter = options.datacenter;

    this.apiRoot = `https://${this.datacenter}.api.mailchimp.com/3.0`;
  }

  request(method, endpoint, data) {
    let request = superagent[method](`${this.apiRoot}${endpoint}`)
      .auth('apikey', this.key);

    if (data) { request.send(data); }

    return new Promise((resolve, reject) => {
      request.end((err, response) => {
        if (err) {
          if (err.response && Object.keys(err.response.body).length > 0) {
            return reject(err.response.body)
          } else {
            return reject(err);
          }
        }

        resolve(response.body);
      });
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

  batchSubscribe(data) {
    data.apikey = this.key;
    return new Promise((resolve, reject) => {
      superagent.post(`https://${this.datacenter}.api.mailchimp.com/2.0/lists/batch-subscribe.json`).send(data).end((err, response) => {
        if (err) {
          if (err.response && Object.keys(err.response.body).length > 0) {
            return reject(err.response.body)
          } else {
            return reject(err);
          }
        }

        resolve(response.body);
      });
    });
  }
}
