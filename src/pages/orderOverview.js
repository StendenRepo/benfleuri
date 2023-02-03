import MainLayout from '../layout/MainLayout';
import Link from 'next/link';
import {
  updateOrderTable,
  getOrderTableData,
  OrderTable,
  TableRow,
  GreenButton,
  WhiteButton,
  nextPage,
  previousPage,
  BlueButton,
} from '../components/OrderTable';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/20/solid';
import { addOrder, addCustomerIfNotExists, getAllOrders } from '../components/sql';

function Header() {
  return (
    <div
      className={`border-b pb-[4%] flex flex-col font-['Roboto'] px-[4%] pt-[2%]`}
    >
      <div
        className={`flex font-['Roboto'] ml-[1%] mb-[1%] w-[150px] justify-between`}
      >
        <Link
          className={`mr-[50px]`}
          href={'/'}
        >
          <ArrowLeftIcon
            className="h-5 w-5 pr-[2%] inline-block"
            aria-hidden="true"
          />
          Dashboard
        </Link>
      </div>
      <div className={`flex flex-row`}>
        <div
          className={`font-['Roboto'] items-start text-3xl font-bold w-1/2 `}
        >
          Bestellingen
        </div>
        <div className={`flex justify-end w-1/2 gap-x-4`}>
          <GreenButton link="/addOrder">Nieuwe Bestelling</GreenButton>
          <button
            // onClick={async () => {await importWooCommerceOrder()}}
            className={`text-sm h-full font-bold border-[1px] border-black rounded py-[8px] px-[20px] 
         font-['Roboto'] bg-white text-black hover:bg-black hover:text-white`}
            type="button"
            id="importbutton"
          >
            Importeer Bestelling
          </button>
          <WhiteButton>Exporteer Bestelling</WhiteButton>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  return getOrderTableData();
}

export default function OrderOverview({ findAllOrders, findAllCustomers }) {
  let content = updateOrderTable({
    startIndex: 0,
    findAllOrders,
    findAllCustomers,
    pageLoad: true,
  });

  return (
    <MainLayout>
      <Header />
      <div className={`h-full flex flex-col items-center py-0 px-8`}>
        <div className="mt-[3%] overflow-auto items-center justify-center w-[95%]">
          <div
            className={`font-['Roboto'] items-start text-2xl font-bold w-1/2 pb-2`}>
            Aantal orders op pagina:
            <select
              className="text-sm h-full font-bold border-[1px] border-black rounded ml-5 py-[8px] px-[20px]
                            font-['Roboto'] bg-white text-black"
              id="orderCount"
              onChange={() => {
                updateOrderTable({
                  startIndex: 0,
                  findAllOrders,
                  findAllCustomers,
                });
              }}
            >
              <option>5</option>
              <option>10</option>
              <option>20</option>
            </select>
          </div>
          <div className={'mb-3'}>
            <button
              id={'prevButton'}
              className={`text-sm h-full font-bold border-[1px] border-black rounded py-[8px] px-[20px] 
         font-['Roboto'] bg-white text-black hover:bg-black hover:text-white disabled:bg-gray-300`}
              type="button"
              onClick={() => {
                previousPage({ findAllOrders, findAllCustomers });
              }}
            >
              <ArrowLeftIcon
                className="h-5 w-5 "
                aria-hidden="true"
              />
            </button>
            <button
              id={'nextButton'}
              className={`text-sm h-full font-bold border-[1px] border-black rounded py-[8px] px-[20px] 
         font-['Roboto'] bg-white text-black hover:bg-black hover:text-white disabled:bg-gray-300`}
              type="button"
              onClick={() => {
                nextPage({ findAllOrders, findAllCustomers });
              }}
            >
              <ArrowRightIcon
                className="h-5 w-5 "
                aria-hidden="true"
              />
            </button>
          </div>
          <div id="tableContainer">
            <OrderTable
              data={content}
              orders={findAllOrders}
              customers={findAllCustomers}
            ></OrderTable>
          </div>
          <div className={'mt-20 w-full flex justify-end'}>
            <GreenButton>Route maken</GreenButton>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export async function importWooCommerceOrder() {
  try {
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
      return_url: 'http://localhost:3000/orderOverview',
      callback_url: 'http://localhost:3000/addOrder',
    };

    const query_string = querystring.stringify(params).replace(/%20/g, '+');
    //console.log(store_url + endpoint + '?' + query_string);
    let findOrders = await getAllOrders("customerId recieverId message productInfo")

    //test order: 39527 or 39685
    WooCommerce.get('orders', {per_page: 15}).then((response) => {
      //convert orderer data to json objects
      response.data.forEach(element => {
        // console.log(element.billing)
        
        const jsonCustomer = JSON.stringify(element.billing);
        const customerData = JSON.parse(jsonCustomer);

        //the data from the customer who ordered
        const first_name = customerData.first_name;
        const last_name = customerData.last_name;
        const company = customerData.company;
        const address = customerData.address_1.split(" ");

        let houseNumber
        let streetName
        if(address.length <= 1) {
          houseNumber = ""
          streetName = address[0]
        } else {
          houseNumber = address.pop()
          streetName = address.join(" ")
        }

        if(houseNumber.length > 6) {
          streetName += houseNumber
          houseNumber = ""
        }
        
        const city = customerData.city;
        const postcode = customerData.postcode.replace(" ", "");
        const country = customerData.country;
        const email = customerData.email;
        const phone = customerData.phone;

        const ordererData = {
          first_name: first_name,
          last_name: last_name,
          company: company,
          address: address,
          city: city,
          postcode: postcode,
          country: country,
          email: email,
          telNumber: phone,
        };

        //convert shipping data to json objects
        const jsonShipping = JSON.stringify(element.shipping);
        const shipping = JSON.parse(jsonShipping);

        //The data where the order should be shipped to
        const shippingFirstName = shipping.first_name;
        const shippingLastName = shipping.last_name;
        const shippingCompany = shipping.company;
        const shippingAddress = shipping.address_1.split(" ");

        let shippingHouseNumber
        let shippingStreetName
        if(shippingAddress.length <= 1) {
          shippingHouseNumber = ""
          shippingStreetName = address[0]
        } else {
          shippingHouseNumber = shippingAddress.pop()
          shippingStreetName = shippingAddress.join(" ")
        }

        if(shippingHouseNumber.length > 6) {
          shippingStreetName += shippingHouseNumber
          shippingHouseNumber = ""
        }

        const shippingCity = shipping.city;
        const shippingpPostcode = shipping.postcode.replace(" ", "");
        const shippingCountry = shipping.country;
        const shippingTelNumber = shipping.phone;

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

        //convert data order to json object
        const jsonOrder = JSON.stringify(element);
        const order = JSON.parse(jsonOrder);
        const jsonOrderLevel1 = JSON.stringify(element.line_items[0]);
        const orderLevel1 = JSON.parse(jsonOrderLevel1);

        //The data of the order
        const status = order.status == "completed" ? "CLOSED" : "OPEN";
        const paymentMethod = order.payment_method_title;
        const shippingCost = order.shipping_total;
        const totalOrderPrice = parseFloat(order.total);
        const datePaid = order.date_paid;
        const product = orderLevel1.name;
        const productQuantity = orderLevel1.quantity;
        const originalDeliveryDate = order.meta_data[2].value.split("/");
        const day = originalDeliveryDate[0]
        const month = originalDeliveryDate[1]
        const year = "20" + originalDeliveryDate[2]
        const deliveryDate = day + "-" + month + "-" + year
        var cardText = orderLevel1.meta_data[1].value[0].value;
        if(typeof cardText === 'undefined') {
          cardText = ""
        }
        var cardTypeIndex = "";
        orderLevel1.meta_data.forEach(element => {
          if (element.key == '_tmcartfee_data') {
            cardTypeIndex = element
            return
          }
        })
        const cardType = cardTypeIndex.value[0][0].element.rules;
        //Card type data
        const noCard = cardType['Ik wil geen kaartje toevoegen_0'];
        const basicCard = cardType['Gratis kaartje_1'];
        const specialCard = cardType['Speciaal wenskaartje_2'];
        const ribbon = cardType['Speciaal wenslintje_3'];

        //Card type check
        const noCardCheck = noCard == '1' ? true : false;
        const basicCardCheck = basicCard == '1' ? true : false;
        const specialCardCheck = specialCard == '1' ? true : false;
        const ribbonCheck = ribbon == '1' ? true : false;

        const productInfo = {
          product: product,
          productQuantity: productQuantity,
          status: status,
          datePaid: datePaid,
          paymentMethod: paymentMethod,
          shippingCost: shippingCost,
          totalOrderPrice: totalOrderPrice,
          deliveryDate: deliveryDate,
          cardText: cardText,
          noCard: noCardCheck,
          basicCard: basicCardCheck,
          specialCard: specialCardCheck,
          ribbonCheck: ribbonCheck,
        };

        let card = ""
        if(basicCard) {
          card = "BASIC_CARD"
        } else if (specialCard) {
          card = "SPECIAL_CARD"
        } else if (ribbonCheck) {
          card = "RIBBON"
        } else {
          card = "NONE"
        }

        const extractedData = {
          ordererData,
          shippingData,
          productInfo,
        };

        (async () => {
          let orderInDatabase = false
          let customer = await addCustomerIfNotExists(first_name, last_name, phone, city, streetName, houseNumber, postcode, company)
          let receiver = await addCustomerIfNotExists(shippingFirstName, shippingLastName, shippingTelNumber, shippingCity, shippingStreetName, shippingHouseNumber, shippingpPostcode, shippingCompany)
          findOrders['findAllOrders'].map((order) => {
            let compareOrder = {
              "customerId": customer.id,
              "recieverId": receiver.id,
              "message": cardText,
              "productInfo": product
            }  
            if(JSON.stringify(compareOrder) == JSON.stringify(order)) {
              orderInDatabase = true
            }
          })
          if(!orderInDatabase) {
            let newOrder = await addOrder(customer.id, 1, receiver.id, deliveryDate, totalOrderPrice, "PIN", "", product, cardText, status, true, card)
            console.log(newOrder)
          }
        })()
        return extractedData;
      });
    });
  } catch (error) {
    console.log(error)
    return null;
  }
}