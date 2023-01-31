import MainLayout from '../layout/MainLayout';
//Is used for hyperlinks.
import Link from 'next/link'
//HeroIcons is used for the SVG icons.
import {ArrowLeftIcon} from '@heroicons/react/20/solid';
import {BlueButton, GreenButton, WhiteButton,} from '../components/OrderTable';
import {updateTotalPriceField, validateElements} from "../components/OrderFormFunctions";
import {updateOrder, getAllCustomers, getAllEmployees, getAllOrders} from "../components/sql";
import { useRouter } from 'next/router'
import { loadPrinters } from '../assets/useLabelPrinter';
import Script from 'next/script';


/**
 * Gets called when the page is loaded, this is where the data from the database is loaded.
 *
 * @returns {Promise<{props: {findAllCustomers: *, findAllEmployees: *}}>}
 */
export async function getServerSideProps() {
  const {findAllOrders} = await getAllOrders("id price customerId employeeId recieverId message extraInfo productInfo dateOfDelivery orderDate includeDelivery cardType orderState paymentMethod")
  const {findAllCustomers} = await getAllCustomers("id firstName lastName city phoneNumber email postalCode streetName houseNumber")
  const {findAllEmployees} = await getAllEmployees("id name")

  return {
    props: {
      findAllOrders,
      findAllCustomers,
      findAllEmployees
    },
  }
}

/**
 * Handles the validating and submitting of the form.
 * When something goes wrong, an alert with an error will be displayed.
 * Otherwise, the data will be added to the database and the user will be redirected
 * to the orderOverview page.
 */

async function handleFormSubmit({orderObj, customerObj, receiverObj, employeeObj}) {
  //Check if all the required fields have been filled out.
  let missingInput = validateElements(false, document.querySelectorAll("input[type=text]"));
  missingInput = validateElements(missingInput, document.querySelectorAll("textarea"));
  missingInput = validateElements(missingInput, document.querySelectorAll("textarea"));
  missingInput = validateElements(missingInput, [document.getElementById("deliveryDate")]);

  let cardSelect = document.querySelector('input[name="cardSelect"]:checked')
  if (cardSelect === null) {
    missingInput = true;
    document.querySelector('#cardSelectContainer').style.border = "solid #ff0000"
  } else {
    document.querySelector('#cardSelectContainer').style.border = ""
  }

  if (missingInput) {
    alert("Er zijn verplichte velden niet ingevuld.")
    return
  }

  let includeDeliveryCosts = document.querySelector('input[name="includeDeliveryCosts"]:checked').value;
  updateTotalPriceField()
  let price = parseFloat(document.getElementById("totalPrice").value)
  //Validate price.
  if (isNaN(price)) {
    alert("De gegeven prijs is ongeldig.")
    return
  }

  //NOTE: We could not get the updateCustomer function done in time.
  //So it only updates the order data.

  /*let customer = await updateCustomer(orderObj.customerId,
      document.getElementById('customerFirstName').value,
      document.getElementById('customerLastName').value,
      document.getElementById('customerPhoneNumber').value,
      document.getElementById('customerPlace').value,
      document.getElementById('customerStreet').value,
      document.getElementById('customerStreetNumber').value,
      document.getElementById('customerPostalCode').value,
  )

  if (customer.error) {
    alert(customer.error.message);
    return
  }
  //Add the receiver if he/she does not yet exist in the database.
  let receiver = await updateCustomer(orderObj.customerId,
      document.getElementById('receiverFirstName').value,
      document.getElementById('receiverLastName').value,
      document.getElementById('receiverPhoneNumber').value,
      document.getElementById('receiverPlace').value,
      document.getElementById('receiverStreet').value,
      document.getElementById('receiverStreetNumber').value,
      document.getElementById('receiverPostalCode').value,
  )

  if (receiver.error) {
    alert(receiver.error.message);
    return
  }*/

  //Format the date to SQL format.
  let splitDate = document.getElementById('deliveryDate').value.split("-")
  let date = splitDate[2] + "-" + (splitDate[1] - 1 )+ "-" + splitDate[0]

  //Add the order to the database.
  let order = await updateOrder(
      orderObj.id,
      customerObj.id,
      parseInt(document.getElementById('employee').value),
      receiverObj.id,
      date,
      price,
      document.getElementById('paymentMethod').value.toUpperCase(),
      document.getElementById('extraInfo').value,
      document.getElementById('productInfo').value,
      document.getElementById('productMessage').value,
      document.getElementById("status").value,
      includeDeliveryCosts === "yes",
      cardSelect.value === "card-free" ? "BASIC_CARD" :
          cardSelect.value === "card-ribbon" ? "RIBBON" :
              cardSelect.value === "card-wish" ? "SPECIAL_CARD" : "NONE"
  )
  if (order.error) {
    alert(order.error.message);
  } else {
    //Redirect to orderOverview if the Order was successfully added to the database.
    window.location.replace("/orderOverview");
  }
}

async function printAdressLabel() {
  var name = document.getElementById("receiverFirstName").value + " " + document.getElementById('receiverLastName').value
  var postalCode = document.getElementById('receiverPostalCode').value
  var adress = document.getElementById('receiverStreet').value + " " + document.getElementById('receiverStreetNumber').value
  var city = document.getElementById('receiverPlace').value

  return loadPrinters([name, postalCode, adress, city])
}

async function printCardLabel() {
  var cardText = document.getElementById("productMessage").value
  return loadPrinters([cardText])
}

/**
 * The page HTML.
 *
 * @param findAllOrders The database date of the orders.
 * @param findAllCustomers The database data of the customers.
 * @param findAllEmployees The database data of the employees.
 * @returns {JSX.Element}
 * @constructor
 */
export default function ViewOrder({findAllOrders, findAllCustomers, findAllEmployees}) {
  const router = useRouter();
  let id = parseInt(router.query.id);
  let order;
  let customer;
  let receiver;
  let employee;
  findAllOrders.map(f => {
    if (parseInt(f.id) === id) {
      order = f;
    }
  })

  console.log(id)

  findAllEmployees.map(f => {
    if (parseInt(f.id) === order.employeeId) {
      employee = f;
    }
  })

  findAllCustomers.map(f => {
    if (parseInt(f.id) === order.customerId) {
      customer = f;
    }
    if (parseInt(f.id) === order.recieverId) {
      receiver = f;
    }
  })
  let date = new Date(+order.dateOfDelivery);
  var month = date.getMonth() + 1;
  var day = date.getDate();

  let dateString = date.getFullYear() + "-" + (month < 10 ? "0" : "") + month + "-" + (day < 10 ? "0" : "") + day
  return (
      <MainLayout>
        <div
            className={`font-['Roboto'] ml-[5%] mt-[2%] border-b-gray-400 border-b-[1px] w-[90%]`}
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
          <div className={`flex justify-between w-[100%] mb-3`}>
            <div className={`font-['Roboto'] text-2xl font-bold`}>
              Order wijzigen
            </div>
            <WhiteButton link="#">Exporteer bestellingen</WhiteButton>
          </div>
        </div>
        <div className={`flex mt-10 w-5/6 ml-[8%] flex-col`}>
          <div className={` bg-[#DEF2E6] h-10 w-[100%] rounded-t-2xl`}>
            <p className={`ml-5 mt-2`}>Klant gegevens</p>
          </div>
          <form className={` w-[100%]`}>
            <div className={`w-[100%] mt-10 flex flex-col sm:flex-row justify-between`}>
              <div className={`border-[1px]flex-col w-[45%] ml-[2%]`}>
                <div className={`font-['Roboto'] text-1xl font-bold`}>
                  Besteller
                </div>
                <div id={"formHtml"}
                     className={`mt-1`}
                >
                  <div className={`flex flex-col`}>
                    <label htmlFor="customerCompanyName">Naam opdrachtgever</label>
                    <input
                        className={`border-[1px] border-gray-500 h-[25px] w-[100%]`}
                        type="text"
                        name="customerCompanyName"
                        id="customerCompanyName"
                    ></input>
                  </div>
                  <div
                      className={`flex flex-col lg:flex-row justify-between mt-[3%]`}>
                    <div className={`flex flex-col`}>
                      <label htmlFor="customerFirstName">
                        Voornaam contactpersoon*
                      </label>
                      <input required
                             className={`border-[1px] border-gray-500 h-[25px] w-[100%]`}
                             type="text"
                             name="customerFirstName"
                             id="customerFirstName"
                             defaultValue={customer.firstName}
                      ></input>
                    </div>
                    <div className={`flex flex-col`}>
                      <label htmlFor="customerLastName">
                        Achternaam contactpersoon*
                      </label>
                      <input required
                             className={`border-[1px] border-gray-500 h-[25px] w-[100%]`}
                             type="text"
                             name="customerLastName"
                             id="customerLastName"
                             defaultValue={customer.lastName}
                      ></input>
                    </div>
                  </div>
                  <div
                      className={`flex flex-col lg:flex-row justify-between mt-[3%]`}>
                    <div className={`flex flex-col`}>
                      <label htmlFor="customerStreet">Straatnaam*</label>
                      <input required
                             className={`border-[1px] border-gray-500 h-[25px] w-[100%]`}
                             type="text"
                             name="customerStreet"
                             id="customerStreet"
                             defaultValue={customer.streetName}
                      ></input>
                    </div>
                    <div className={`flex w-[100%] lg:w-[48%] justify-between`}>
                      <div className={`flex flex-col`}>
                        <label htmlFor="customerStreetNumber">Nummer*</label>
                        <input required
                               className={`border-[1px] border-gray-500 h-[25px] w-[95%]`}
                               type="text"
                               name="customerStreetNumber"
                               id="customerStreetNumber"
                               defaultValue={customer.houseNumber}
                        ></input>
                      </div>
                      <div className={`flex flex-col`}>
                        <label htmlFor="customerPostalCode">Postcode*</label>
                        <input required
                               className={`border-[1px] border-gray-500 h-[25px] w-[100%]`}
                               type="text"
                               name="customerPostalCode"
                               id="customerPostalCode"
                               defaultValue={customer.postalCode}
                        ></input>
                      </div>
                    </div>
                  </div>
                  <div className={`flex flex-col mt-[3%]`}>
                    <label htmlFor="customerPlace">Plaats*</label>
                    <input required
                           className={`border-[1px] border-gray-500 h-[25px] w-[100%]`}
                           type="text"
                           name="customerPlace"
                           id="customerPlace"
                           defaultValue={customer.city}
                    ></input>
                  </div>
                  <div className={`flex flex-col mt-[3%]`}>
                    <label htmlFor="customerPhoneNumber">
                      Telefoonnummer*
                    </label>
                    <input required
                           className={`border-[1px] border-gray-500 h-[25px] w-[100%]`}
                           type="text"
                           name="customerPhoneNumber"
                           id="customerPhoneNumber"
                           defaultValue={customer.phoneNumber}
                    ></input>
                  </div>
                  <div className={`flex flex-col lg:flex-row justify-between`}>
                    <div className={`flex flex-col  mt-[3%]`}>
                      <label className={`mt-[3%]`}>Bezorgkosten*</label>
                      <div
                          className={`flex w-[200px] justify-between lg:w-[90%]`}
                      >
                        <div className={`flex justify-between`}>
                          <input required
                                 className={`accent-[#009A42]`}
                                 type="radio"
                                 name="includeDeliveryCosts"
                                 id="includeDeliveryCosts"
                                 value="yes"
                                 defaultChecked={order.includeDelivery}
                                 onChange={() => {
                                   updateTotalPriceField()
                                 }
                                 }
                          ></input>
                          <label
                              className={`ml-1`}
                              htmlFor="includeDeliveryCosts">
                            Ja
                          </label>
                        </div>
                        <div
                            className={`flex justify-between sm:ml[0px] ml-[5%]`}
                        >
                          <input
                              className={`accent-[#009A42]`}
                              type="radio"
                              name="includeDeliveryCosts"
                              id="includeDeliveryCosts"
                              value="no"
                              defaultChecked={!order.includeDelivery}
                              onChange={() => {
                                updateTotalPriceField()
                              }
                              }
                          ></input>
                          <label
                              className={`ml-1`}
                              htmlFor="includeDeliveryCosts">
                            Nee
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className={`flex flex-col mt-[3%] w-[95px]`}>
                      <label htmlFor="paymentMethod">Betaalwijze*</label>
                      <select
                          className={`border-[1px] border-gray-500 h[10px]`}
                          name="paymentMethod"
                          id="paymentMethod"
                      >
                        <option selected={order.paymentMethod === "PIN"} value="pin">Pin</option>
                        <option selected={order.paymentMethod === "BY_INVOICE"} value="by_invoice">Factuur</option>
                        <option selected={order.paymentMethod === "CASH"} value="cash">Contant</option>
                      </select>
                    </div>
                  </div>
                  <div
                      className={`flex flex-col lg:flex-row justify-between mt-[3%]`}>
                    <div className={`flex flex-col w-[100%]`}>
                      <label
                          className={`w-[200px]`}
                          htmlFor="deliveryDate">
                        Datum van bezorging*
                      </label>
                      <input required
                             className={`border-[1px] border-gray-500 h-6 w-[100%] lg:w-[200px]`}
                             type="date"
                             name="deliveryDate"
                             id="deliveryDate"
                             defaultValue={dateString}
                      ></input>
                    </div>
                    <div className={`flex flex-col`}>
                      <label htmlFor="deliveryMethod">Verzending*</label>
                      <select required
                              className={`border-[1px] border-gray-500`}
                              name="deliveryMethod"
                              id="deliveryMethod">
                        <option value="pickup">Afhalen</option>
                        <option value="deliver">Bezorging</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className={` sm:mt-[0px] mt-[10%] sm:ml-[0px] ml-[2%] flex-col w-[45%] mr-[2%] pb-1`}>
                <div className={`font-['Roboto'] text-1xl font-bold`}>
                  Ontvanger
                </div>
                <formHtml
                    className={`mt-1`}
                    method="POST"
                    action="">
                  <div className={`flex flex-col lg:flex-row justify-between`}>
                    <div className={`flex flex-col`}>
                      <label
                          className={'w-[150px]'}
                          htmlFor="receiverFirstName">
                        Naam ontvanger*
                      </label>
                      <input required
                             className={`border-[1px] border-gray-500 h-[25px] w-[100%]`}
                             type="text"
                             name="receiverFirstName"
                             id="receiverFirstName"
                             defaultValue={receiver.firstName}
                      ></input>
                    </div>
                    <div className={`flex flex-col`}>
                      <label htmlFor="receiverLastName">Achternaam*</label>
                      <input required
                             className={`border-[1px] border-gray-500 h-[25px] w-[100%]`}
                             type="text"
                             name="receiverLastName"
                             id="receiverLastName"
                             defaultValue={receiver.lastName}
                      ></input>
                    </div>
                  </div>
                  <div
                      className={`flex flex-col lg:flex-row justify-between mt-[3%]`}>
                    <div className={`flex flex-col`}>
                      <label htmlFor="receiverStreet">Straatnaam*</label>
                      <input required
                             className={`border-[1px] border-gray-500 h-[25px] w-[100%]`}
                             type="text"
                             name="receiverStreet"
                             id="receiverStreet"
                             defaultValue={receiver.streetName}
                      ></input>
                    </div>
                    <div className={`flex w-[100%] lg:w-[45%] justify-between`}>
                      <div className={`flex flex-col`}>
                        <label htmlFor="receiverStreetNumber">Nummer*</label>
                        <input required
                               className={`border-[1px] border-gray-500 h-[25px] w-[95%]`}
                               type="text"
                               name="receiverStreetNumber"
                               id="receiverStreetNumber"
                               defaultValue={receiver.houseNumber}
                        ></input>
                      </div>
                      <div className={`flex flex-col`}>
                        <label htmlFor="receiverPostalCode">Postcode*</label>
                        <input required
                               className={`border-[1px] border-gray-500 h-[25px] w-[100%]`}
                               type="text"
                               name="receiverPostalCode"
                               id="receiverPostalCode"
                               defaultValue={receiver.postalCode}
                        ></input>
                      </div>
                    </div>
                  </div>
                  <div className={`flex flex-col  mt-[3%]`}>
                    <label htmlFor="receiverPlace">Plaats*</label>
                    <input required onChange={() => {
                      updateTotalPriceField()
                    }
                    }
                           className={`border-[1px] border-gray-500 h-[25px] w-[100%]`}
                           type="text"
                           name="receiverPlace"
                           id="receiverPlace"
                           defaultValue={receiver.city}
                    ></input>
                  </div>
                  <div className={`flex flex-col  mt-[3%]`}>
                    <label htmlFor="receiverPhoneNumber">
                      Telefoonnummer*
                    </label>
                    <input required
                           className={`border-[1px] border-gray-500 h-[25px] w-[100%]`}
                           type="text"
                           name="receiverPhoneNumber"
                           id="receiverPhoneNumber"
                           defaultValue={receiver.phoneNumber}
                    ></input>
                  </div>
                  <div
                      className={`flex flex-col sm:flex-row justify-between mt-[3%]`}
                  >
                    <div className={`flex flex-col`}>
                      <label
                          className={'w-[122px]'}
                          htmlFor="orderPrice">
                        Prijs bestelling*
                      </label>
                      <input required onChange={() => {
                        updateTotalPriceField()
                      }
                      }
                             className={`border-[1px] border-gray-500 h-[25px] sm:w-[50%] w-[100%]`}
                             type="text"
                             name="orderPrice"
                             id="orderPrice"
                             defaultValue={order.price}
                      ></input>
                    </div>
                    <div className={`flex flex-col`}>
                      <label
                          className={'w-[130px]'}
                          htmlFor="totalPrice">
                        Prijs totaal
                      </label>
                      <input disabled
                             className={`border-[1px] bg-gray-200 border-gray-500 h-[25px] sm:w-[50%] w-[100%]`}
                             type="text"
                             name="totalPrice"
                             id="totalPrice"
                      ></input>
                    </div>
                  </div>
                  <div
                      className={`flex sm:flex-row flex-col sm:ml-[0px] ml-[10%] justify-between mt-[85px] w-[82%]`}
                  >
                    <input className={`text-sm border-[1px] h-full py-[8px] px-[20px] font-['Roboto'] 
        bg-[#00A952] text-white font-bold border-[#45a049] rounded-lg hover:bg-[#45a049]`}
                           value="Order wijzigen" type="button" onClick={
                      async () => {
                        await handleFormSubmit({orderObj: order,
                        customerObj: customer, employeeObj: employee, receiverObj: receiver});
                      }
                    }></input>
                  </div>
                </formHtml>
              </div>
            </div>
            <div
                className={`w-[100%] mt-20 flex flex-col sm:flex-row justify-between border-t-gray-400 border-t-[1px] pb-5`}>
              <div className={`border-[1px]flex-col w-[45%] ml-[2%] mt-[50px]`}>
                <div className={`font-['Roboto'] text-1xl font-bold`}>
                  Product
                </div>
                <formHtml>
                  <div className={`flex flex-col`}>
                    <label
                        className={`mt-3`}
                        htmlFor="productInfo">
                      Omschrijving bestelling*
                    </label>
                    <textarea required
                              className={`border-[1px] border-gray-500 h-[80px] resize-none`}
                              name="productInfo"
                              id="productInfo"
                              defaultValue={order.productInfo}
                    ></textarea>
                  </div>
                  <div className={`flex flex-col`}>
                    <label
                        className={`mt-3 w-[100%]`}
                        htmlFor="productMessage">
                      Optioneel tekst voor op het kaartje
                    </label>
                    <textarea
                        className={`border-[1px] border-gray-500 h-[80px] resize-none`}
                        name="productMessage"
                        id="productMessage"
                        defaultValue={order.message}
                    ></textarea>
                  </div>
                  <div className={`flex flex-col`}>
                    <label
                        className={`mt-3`}
                        htmlFor="extraInfo">
                      Bijzonderheden
                    </label>
                    <textarea
                        className={`border-[1px] border-gray-500 h-[80px] resize-none`}
                        name="extraInfo"
                        id="extraInfo"
                        defaultValue={order.extraInfo}
                    ></textarea>
                  </div>
                </formHtml>
              </div>
              <div className={`flex-col w-[45%] mr-[2%] mt-[110px]`}>
                <div id={"cardSelectContainer"} className={`flex flex-col md:flex-row md:ml-[0px] ml-[5%]`}>
                  <div className={`w-[82%] flex flex-col`}>
                    <div className={` w-[100%] `}>
                      <input required
                             className={`accent-[#009A42]`}
                             type="radio"
                             name="cardSelect"
                             id="cardSelect"
                             value="card-free"
                             defaultChecked={order.cardType === "BASIC_CARD"}
                      ></input>
                      <label
                          className={`ml-[5px]`}
                          htmlFor="cardSelect">
                        Gratis kaartje
                      </label>
                    </div>
                    <div className={`w-[100%]`}>
                      <input
                          className={`accent-[#009A42]`}
                          type="radio"
                          name="cardSelect"
                          id="cardSelect"
                          value="card-none"
                          defaultChecked={order.cardType === "NONE"}
                      ></input>
                      <label
                          className={`ml-[5px]`}
                          htmlFor="cardSelect">
                        Geen kaartje
                      </label>
                    </div>
                  </div>
                  <div className={` w-[90%] flex flex-col`}>
                    <div className={` w-[100%] flex`}>
                      <input
                          className={`accent-[#009A42]`}
                          type="radio"
                          name="cardSelect"
                          id="cardSelect"
                          value="card-ribbon"
                          defaultChecked={order.cardType === "RIBBON"}
                      ></input>
                      <label
                          className={`ml-[5px]`}
                          htmlFor="cardSelect">
                        Speciaal wenslintje
                      </label>
                    </div>
                    <div className={` w-[100%] flex`}>
                      <input
                          className={`accent-[#009A42]`}
                          type="radio"
                          name="cardSelect"
                          id="cardSelect"
                          value="card-wish"
                          defaultChecked={order.cardType === "SPECIAL_CARD"}
                      ></input>
                      <label
                          className={`ml-[5px]`}
                          htmlFor="cardSelect">
                        Speciaal wenskaartje
                      </label>
                    </div>
                  </div>
                </div>
                <div
                    className={`flex flex-col sm:w-[80%] w-[100%] justify-between mt-[45px]`}
                >
                  <label htmlFor="employee">Status:</label>
                  <select required
                          className={`border-[1px] border-black w-[100%] h-[30px]`}
                          name="status"
                          id="status">
                    <option selected={order.orderState === "IN_PROGRESS"} value={"IN_PROGRESS"}>Gelevert maar niet thuis</option>
                    <option selected={order.orderState === "OPEN"} value={"OPEN"}>Open</option>
                    <option selected={order.orderState === "DELIVERED"} value={"DELIVERED"}>Verzonden</option>
                    <option selected={order.orderState === "CLOSED"} value={"CLOSED"}>Voltooid</option>
                  </select>
                  <label htmlFor="employee">Aangenomen door:</label>
                  <select required
                          className={`border-[1px] border-black w-[100%] h-[30px]`}
                          name="employee"
                          id="employee">
                    {findAllEmployees.map(f => {
                      return <option selected={f.id === employee.id} value={f.id}>{f.name}</option>
                    })}
                  </select>
                  <label htmlFor="processEmployee">In behandeling door:</label>
                  <select required
                          className={`border-[1px] border-black w-[100%] h-[30px]`}
                          name="processEmployee"
                          id="processEmployee">
                    {findAllEmployees.map(f => {
                      return <option selected={f.id === employee.id} value={f.id}>{f.name}</option>
                    })}
                  </select>

                </div>
                <div
                    className={`flex sm:flex-col gap-y-4 flex-col sm:ml-[0px] ml-[10%] mt-[85px] w-[82%]`}
                >
                <BlueButton onClick={printCardLabel}>Tekst kaartje uitprinten</BlueButton>
                <BlueButton onClick={printAdressLabel}>Adres uitprinten</BlueButton>
                </div>
              </div>
            </div>
          </form>
        </div>
      </MainLayout>
  );
}
