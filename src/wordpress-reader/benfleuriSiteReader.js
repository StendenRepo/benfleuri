// import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api"; // Supports ESM
const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default;

const WooCommerce = new WooCommerceRestApi({
  url: 'https://example.com',
  consumerKey: '',
  consumerSecret: '',
  version: 'wc/v3',
});

//Authentication rest api (lay-out)
const querystring = require('querystring');

const store_url = 'https://benfleuri.nl/';
const endpoint = '/wc-auth/v1/authorize';
const params = {
  app_name: 'BenFleuri',
  scope: 'read',
  user_id: 123,
  return_url: 'http://localhost:3000/addOrder',
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

//Get order data from a specific order (lay-out)
WooCommerce.get('orders/727')
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error.response.data);
  });
