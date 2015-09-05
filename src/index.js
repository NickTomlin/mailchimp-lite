import superagent from 'superagent';

export default class MailChimpConnector {
  constructor (options) {
    this.key = options.key;
    this.datacenter = options.datacenter;

    this.apiRoot = `https://${this.datacenter}.api.mailchimp.com/3.0`;
  }

  request(method, endpoint, data, transform = () => {}) {
    let request = superagent[method](`${this.apiRoot}${endpoint}`)
      .auth('apikey', this.key);

    if (data) { request.send(data); }

    transform(request);

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

  get(endpoint, transform) {
    return this.request('get', endpoint, transform);
  }

  post(endpoint, data, transform) {
    return this.request('post', endpoint, data, transform);
  }

  delete(endpoint, data, transform) {
    return this.request('del', endpoint, data, transform);
  }

  put(endpoint, data, transform) {
    return this.request('put', endpoint, data, transform);
  }

  patch(endpoint, data, transform) {
    return this.request('patch', endpoint, data, transform);
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
