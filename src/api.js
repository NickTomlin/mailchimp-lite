import superagent from 'superagent';

export default class API {
  constructor({datacenter, key} = {}) {
    if (!key) { throw new Error('Mailchimp API Key Required') }
    if (!datacenter) { throw new Error('Mailchimp DataCenter Required') }

    this.key = key;
    this.datacenter = datacenter;
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
}
