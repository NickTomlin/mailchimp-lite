mailchimp-lite [![Build Status](http://img.shields.io/travis/NickTomlin/mailchimp-lite/master.svg?style=flat)](https://travis-ci.org/NickTomlin/mailchimp-lite) ![NPM package](https://img.shields.io/npm/v/mailchimp-lite.svg) [![Join the chat at https://gitter.im/NickTomlin/mailchimp-lite](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/NickTomlin/mailchimp-lite?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
===

A lightweight wrapper for Mailchimp's [v2](https://apidocs.mailchimp.com/api/2.0/) and [v3](http://kb.mailchimp.com/api/?utm_source=apidocs&utm_medium=internal_ad&utm_campaign=api_v3) apis.

``` shell
npm i mailchimp-lite --save
```

# Usage

```javascript
let Mailchimp = require('mailchimp-lite');

let mailchimp = new Mailchimp({
  key: process.env.MAILCHIMP_API_KEY,
  datacenter: MAILCHIMP_DATACENTER
});

# get details on a list
mailchimp
  .get('/list/my-list-id')
  .then((listInstance) => {
    console.log(listInstance);
  });

# delete a list
mailchimp
  .delete('/lists/my-list-id');

# use the v2 api to batch-subscribe (currently not available in V3 api)
return mailchimp.v2.post('/lists/batch-subscribe', {
  id: 'my-list-id'
  update_existing: true,
  double_optin: false,
  replace_interests: false,
  batch: [
    {email: {email: 'freddy@mailchimp.com'}}
  ]
})
.then((response) => { console.log(response); })
```

# Error Handling

Responses with a non 200-300 status will reject with an Error object. The error has a `response` which is the response object from [request](https://github.com/request/request).

```javascript
mailchimp
  .get('/list/my-list-id')
  .catch((error) => {
    console.log(error); // Mailchimp Error: 401
    console.log(error.response);
  });
```

# Contributing

After cloning this repository:

```
npm i

# run the tests
npm t
```
