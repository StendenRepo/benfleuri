import MainLayout from '../layout/MainLayout';
import {
  OrderTable,
  TableRow,
  GreenButton,
  WhiteButton,
} from '../components/OrderTable';

function Header() {
  return (
    <div
      className={`border-b pb-[4%] flex flex-col font-['Roboto'] px-[4%] pt-[2%]`}
    >
      <div className={`font-['Roboto'] ml-[2%] mb-[1%]`}>
        <a href={'/'}>Dashboard</a>
      </div>
      <div className={`flex flex-row`}>
        <div
          className={`font-['Roboto'] items-start text-3xl font-bold w-1/2 `}
        >
          Bestellingen
        </div>
        <div className={`flex justify-end w-1/2 gap-x-4`}>
          <GreenButton>Nieuwe Bestelling</GreenButton>
          <select placeholder="Importeer Bestelling">
            <option value="Woocommerce">WooCommerce</option>
            <option value="pdf">PDF</option>
          </select>
          <WhiteButton>Exporteer Bestelling</WhiteButton>
        </div>
      </div>
    </div>
  );
}

export default function OrderOverview() {
  return (
    <MainLayout>
      <Header />

      <div className={`h-full flex flex-col items-center py-0 px-8`}>
        <div className="mt-[3%] overflow-auto items-center justify-center w-[95%]">
          <div
            className={`font-['Roboto'] items-start text-2xl font-bold w-1/2 pb-4`}
          >
            Aantal orders op pagina:
            <select
              className="text-sm h-full font-bold border-[1px] border-black rounded ml-5 py-[8px] px-[20px]
                            font-['Roboto'] bg-white text-black"
            >
              <option>10</option>
              <option>20</option>
            </select>
          </div>
          <OrderTable>
            <TableRow
              data={[
                1,
                'Brian Hoogerwerf',
                '23 rooie tulpen met gratis kaartje',
                'Brian Hoogerwerf',
                'Factuur',
                'send',
                '29,45',
              ]}
            />
            <TableRow
              data={[
                1,
                'Brian Hoogerwerf',
                '23 rooie tulpen met gratis kaartje',
                'Brian Hoogerwerf',
                'Factuur',
                'send',
                '29,45',
              ]}
            />
            <TableRow
              data={[
                1,
                'Brian Hoogerwerf',
                '23 rooie tulpen met gratis kaartje',
                'Brian Hoogerwerf',
                'Factuur',
                'send',
                '29,45',
              ]}
            />
          </OrderTable>
          <div className={'mt-20 w-full flex justify-end'}>
            <GreenButton>Route maken</GreenButton>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

async function importWooCommerceOrder() {
  // import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api"; // Supports ESM
  const WooCommerceRestApi =
    require('@woocommerce/woocommerce-rest-api').default;

  const WooCommerce = new WooCommerceRestApi({
    url: 'https://benfleuri.nl/',
    consumerKey: process.env.REACT_APP_API_KEY,
    consumerSecret: process.env.REACT_APP_SECRET_API_KEY,
    version: 'wc/v3',
  });

  //Authentication rest api
  const querystring = require('querystring');

  const store_url = 'https://benfleuri.nl/';
  const endpoint = '/wc-auth/v1/authorize';
  const params = {
    app_name: 'BenFleuri',
    scope: 'read',
    user_id: 1,
    return_url: 'http://localhost:3000/addOrder',
    callback_url: 'https://app.com/callback-endpoint',
  };

  const query_string = querystring.stringify(params).replace(/%20/g, '+');
  console.log(store_url + endpoint + '?' + query_string);

  WooCommerce.get('orders/39527').then((response) => {
    //the data from the customer who ordered
    const first_name = response.data.billing.first_name;
    const last_name = response.data.billing.last_name;
    const company = response.data.billing.company;
    const address = response.data.billing.address_1;
    const city = response.data.billing.city;
    const postcode = response.data.billing.postcode;
    const country = response.data.billing.country;
    const email = response.data.billing.email;
    const phone = response.data.billing.phone;

    const ordererData = {
      first_name: first_name,
      last_name: last_name,
      company: company,
      address: address,
      city: city,
      postcode: postcode,
      country: country,
      email: email,
      phone: phone,
    };

    //The data where the order should be shipped to
    const shippingFirstName = response.data.shipping.first_name;
    const shippingLastName = response.data.shipping.last_name;
    const shippingCompany = response.data.shipping.company;
    const shippingAddress = response.data.shipping.address_1;
    const shippingCity = response.data.shipping.city;
    const shippingpPostcode = response.data.shipping.postcode;
    const shippingCountry = response.data.shipping.country;
    const shippingTelNumber = response.data.shipping.phone;

    const shippingData = {
      first_name: shippingFirstName,
      last_name: shippingLastName,
      shippingcompany: shippingCompany,
      address: shippingAddress,
      city: shippingCity,
      postcode: shippingpPostcode,
      country: shippingCountry,
      telNumber: shippingTelNumber,
    };

    //The data of the order
    const status = response.data.status;
    const paymentMethod = response.data.payment_method_title;
    const shippingCost = response.data.shipping_total;
    const totalOrderPrice = response.data.total;
    const datePaid = response.data.date_paid;
    const product = response.data.line_items.name;
    const productQuantity = response.data.quantity;

    const productInfo = {
      product: product,
      productQuantity: productQuantity,
      status: status,
      datePaid: datePaid,
      paymentMethod: paymentMethod,
      shippingCost: shippingCost,
      totalOrderPrice: totalOrderPrice,
    };

    console.log(product);
  });
}

importWooCommerceOrder();

// const metaDataOrder = response.data.meta_data;

// const datekey =
//   key == 'Bezorgdatum' ? console.log(value) : console.log('nope');
