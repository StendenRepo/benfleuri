import { extractPimmSolutionsFormData } from "./eml-reader/pimmFormReader";
import { extractWebbloemenData } from "./pdf-reader/webbloemenReader";
import { extractOrderFormData } from "./eml-reader/websiteFormReader";
import { extractEurofloristData } from "./pdf-reader/eurofloristReader";
import { extractWyBloemistenData } from "./pdf-reader/wyBloemistenReader";
import { request, gql } from 'graphql-request'

export async function fileReader(file) {

    const fileName = file.originalFilename.toLowerCase()
    const filepath = file.filepath
    var fileData;

    if(fileName.includes("wybloem")) {
      fileData = await extractWyBloemistenData(filepath)
    }

    if(fileName.includes("bestelform")) {
      fileData = await extractOrderFormData(filepath)
    }

    if(fileName.includes("pimm")) {
      fileData = await extractPimmSolutionsFormData(filepath)
    }

    if(fileName.includes("webbloemen")) {
      fileData = await extractWebbloemenData(filepath)
    }

    if(fileName.includes("euroflorist")) {
      fileData = await extractEurofloristData(filepath)
    }

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
    console.log(fileData)
    const variables = {
      "recieverId": 1,
      "customerId": 1,
      "employeeId": 1,
      "productInfo": fileData['description'],
      "message": fileData['cardText'],
      "extraInfo": fileData['comments'],
      "cardType": fileData['withCard'],
      "includeDelivery": fileData['withDeliveryCosts'],
      "price": fileData['price'],
      "dateOfDelivery": fileData['deliveryDate'],
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
    return fileData;
}