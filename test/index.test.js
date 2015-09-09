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

      return mailchimp.get('/lists/my-list').then(() => expectation.done());
    });

    it('parses JSON responses', () => {
      let expectation = api
        .get('/lists/my-list')
        .basicAuth({user: 'apikey', pass: 'fakeKey'})
        .reply(200);

      return mailchimp.get('/lists/my-list').then(() => expectation.done());
    });

    context('non successful responses', () => {
      it('rejects with an error message for status codes that are not between 200-300', () => {
        let expectation = api
          .get('/lists/my-list')
          .basicAuth({user: 'apikey', pass: 'fakeKey'})
          .reply(400);

        return mailchimp.get('/lists/my-list').catch((err) => {
          expect(err).to.match(/Mailchimp Error: 400/);
          expect(err.response).to.have.property('body');
          expectation.done();
        });
      });
    });


    V3_METHODS.forEach(function (method) {
      it(`supports ${method.toUpperCase()}`, () => {
        let expectation = api[method]('/lists/my-list')
          .basicAuth({user: 'apikey', pass: 'fakeKey'})
          .reply(200, {});

        return mailchimp[method]('/lists/my-list').then(() => expectation.done());
      });
    });
  });

  describe('v2 api', function () {
    let api;

    beforeEach(() => {
      api = nock('https://us11.api.mailchimp.com/2.0');
    });

    it('sends auth info on request body', () => {
      let expectation = api
        .post('/lists/batch-subscribe.json', {
          foo: 'bar',
          apikey: 'fakeKey'
        })
        .reply(200);

      return mailchimp.v2.post('/lists/batch-subscribe', {foo: 'bar'})
        .then(() => expectation.done());
    });

    it('parses JSON responses', () => {
      let expectation = api
          .post('/lists/my-list.json', {
            apikey: 'fakeKey'
          })
          .reply(200);

      return mailchimp.v2.post('/lists/my-list').then(() => expectation.done());
    });

    it('supports POST', () => {
      let expectation = api
        .post('/lists/my-list.json', {
          apikey: 'fakeKey'
        })
        .reply(200);

      return mailchimp.v2.post('/lists/my-list').then(() => expectation.done());
    });

    context('non successful responses', () => {
      it('rejects with an error message for status codes that are not between 200-300', () => {
        let expectation = api
          .post('/lists/my-list.json', {
            apikey: 'fakeKey'
          })
          .reply(400, {});

        return mailchimp.v2.post('/lists/my-list').catch((err) => {
          expect(err).to.match(/Mailchimp Error: 400/);
          expect(err.response).to.have.property('body');
          expectation.done();
        });
      });
    });
  });
});
