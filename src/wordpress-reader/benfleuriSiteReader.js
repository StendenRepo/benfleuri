//Authentication rest api (lay-out)
const querystring = require('querystring');

const store_url = 'http://example.com';
const endpoint = '/wc-auth/v1/authorize';
const params = {
  app_name: 'My App Name',
  scope: 'read_write',
  user_id: 123,
  return_url: 'http://app.com/return-page',
  callback_url: 'https://app.com/callback-endpoint',
};
const query_string = querystring.stringify(params).replace(/%20/g, '+');

//Get all order data from wordpress BenFleuri site (lay-out)
console.log(store_url + endpoint + '?' + query_string);

WooCommerce.get('orders')
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error.response.data);
  });
