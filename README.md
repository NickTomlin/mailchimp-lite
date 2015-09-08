mailchimp lite
===

``` shell
npm i mailchimp-lite
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

# use the v2 batch subscribe api
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

# Contributing

After cloning this repository:

```
npm i

# run the tests
npm t
```
