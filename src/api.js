import superagent from 'superagent';

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
