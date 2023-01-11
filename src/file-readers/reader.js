import { extractPimmSolutionsFormData } from "./eml-reader/pimmFormReader";
import { extractWebbloemenData } from "./pdf-reader/webbloemenReader";
import { extractOrderFormData } from "./eml-reader/websiteFormReader";
import { extractEurofloristData } from "./pdf-reader/eurofloristReader";
import { extractWyBloemistenData } from "./pdf-reader/wyBloemistenReader";
import { request, gql } from 'graphql-request'

export async function getServerSideProps(fileData) {
    console.log(fileData)
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
    "productInfo": "d",
    "message": "df",
    "extraInfo": "fdfd",
    "cardType": "NONE",
    "includeDelivery": true,
    "price": 100,
    "dateOfDelivery": "21-12-2034",
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
    var fileData;
    switch(true) {
        case fileName.includes("bestelformulier"):
            fileData = extractOrderFormData(filepath).then((res) => {console.log(res)})
            break
        case fileName.includes("wybloem"):
            fileData = extractWyBloemistenData(filepath).then((res) => {console.log(res)})
            break
        case fileName.includes("pimm"):
            fileData = extractPimmSolutionsFormData(filepath).then((res) => {console.log(res)})
            break
        case fileName.includes("webbloemen"):
            fileData = extractWebbloemenData(filepath).then((res) => {console.log(res)})
            break
        case fileName.includes("euroflorist"):
            fileData = extractEurofloristData(filepath).then((res) => {console.log(res)})
            break
        default:
            console.log("Could not read file")
            return
    }
    getServerSideProps(fileData)
    return fileData;
}