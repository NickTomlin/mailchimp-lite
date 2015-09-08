import MailChimp from '../src/index';
import nock from 'nock';

describe('MailChimp Lite', function () {
  let mailchimp;

  beforeEach(function () {
    mailchimp = new MailChimp({
      key: 'fakeKey',
      datacenter: 'us11'
    });
  });

  it('requires a mailchimp api key', () => {
    expect(() => {
      let newChimp = new MailChimp({
        dataCenter: 'us11'
      })
    }).to.throw(/Mailchimp API Key Required/);
  });

  it('requires a mailchimp data center', () => {
    expect(() => {
      let newChimp = new MailChimp({
        key: 'Foo'
      })
    }).to.throw(/Mailchimp DataCenter Required/);
  });

  describe('v3 api', () => {
    let api;
    const V3_METHODS = ['get', 'put', 'post', 'patch', 'delete'];

    beforeEach(() => {
      api = nock('https://us11.api.mailchimp.com/3.0');
    });

    it('sends basic auth headers', () => {
      let expectation = api
        .get('/lists/my-list')
        .basicAuth({user: 'apikey', pass: 'fakeKey'})
        .reply(200);

        mailchimp.get('/lists/my-list');

        expectation.done();
    });

    it('rejects for non-successful status codes');
    it('rejects for connection errors');

    V3_METHODS.forEach(function (method) {
      it(`Supports ${method.toUpperCase()}`, () => {
        let expectation = api[method]('/lists/my-list')
        .basicAuth({user: 'apikey', pass: 'fakeKey'})
        .reply(200);

        mailchimp[method]('/lists/my-list');

        expectation.done();
      });
    });
  });
});
