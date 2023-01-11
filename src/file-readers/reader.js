import { extractPimmSolutionsFormData } from "./eml-reader/pimmFormReader";
import { extractWebbloemenData } from "./pdf-reader/webbloemenReader";
import { extractOrderFormData } from "./eml-reader/websiteFormReader";
import { extractEurofloristData } from "./pdf-reader/eurofloristReader";
import { extractWyBloemistenData } from "./pdf-reader/wyBloemistenReader";
import { request, gql } from 'graphql-request'

export async function getServerSideProps() {
  const query = gql
  `mutation CreateOrder($customerId: Int!, $employeeId: Int!, $recieverId: Int!, $productInfo: String, $message: String, $extraInfo: String, $cardType: CardType, $includeDelivery: Boolean, $price: Float, $dateOfDelivery: String, $orderState: OrderState, $paymentMethod: PaymentMethod) {
    createOrder(customerId: $customerId, employeeId: $employeeId, recieverId: $recieverId, productInfo: $productInfo, message: $message, extraInfo: $extraInfo, cardType: $cardType, includeDelivery: $includeDelivery, price: $price, dateOfDelivery: $dateOfDelivery, orderState: $orderState, paymentMethod: $paymentMethod) {
      dateOfDelivery
      employeeId
      extraInfo
      id
      includeDelivery
      message
      orderDate
      orderState
      paymentMethod
      price
      productInfo
      recieverId
      cardType
      customerId
    }
  }
  `
  const variables = {
    "recieverId": 1,
    "customerId": 1,
    "employeeId": 1,
    "productInfo": "Hello",
    "message": "hello",
    "extraInfo": "nothing",
    "cardType": "NONE",
    "includeDelivery": false,
    "price": 20,
    "dateOfDelivery": "10-02-2023",
    "orderState": "OPEN",
    "paymentMethod": "PIN"
  }
  const data = await request('http://localhost:3000/api/graphql', query, variables)
  const { frameworks } = data
  return {
    props: {
      frameworks,
    },
  }
}

export async function fileReader(file) {

    const fileName = file.originalFilename.toLowerCase()
    const filepath = file.filepath
    var data;
    switch(true) {
        case fileName.includes("bestelformulier"):
            data = extractOrderFormData(filepath).then((res) => {console.log(res)})
            break
        case fileName.includes("wybloem"):
            data = extractWyBloemistenData(filepath).then((res) => {console.log(res)})
            break
        case fileName.includes("pimm"):
            data = extractPimmSolutionsFormData(filepath).then((res) => {console.log(res)})
            break
        case fileName.includes("webbloemen"):
            data = extractWebbloemenData(filepath).then((res) => {console.log(res)})
            break
        case fileName.includes("euroflorist"):
            data = extractEurofloristData(filepath).then((res) => {console.log(res)})
            break
        default:
            console.log("Could not read file")
            return
    }
    getServerSideProps()
    return data;
}