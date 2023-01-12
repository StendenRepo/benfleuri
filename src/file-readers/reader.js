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

    // Create a customer in the database (the person who ordered)
    const createCustomer = gql
    `mutation CreateCustomer($firstName: String!, $lastName: String!, $phoneNumber: String!, $city: String, $streetName: String, $postalCode: String, $email: String, $houseNumber: String) {
        createCustomer(firstName: $firstName, lastName: $lastName, phoneNumber: $phoneNumber, city: $city, streetName: $streetName, postalCode: $postalCode, email: $email, houseNumber: $houseNumber) {
          id
          firstName
          lastName
          city
          phoneNumber
          email
          postalCode
          streetName
          houseNumber
        }
      }
    `
    // console.log(fileData)
    var variables = {
      "city": fileData['city'],
      "email": fileData['email'],
      "firstName": fileData['firstName'],
      "lastName": fileData['lastName'],
      "phoneNumber": fileData['phoneNumber'],
      "postalCode": fileData['postalCode'],
      "streetName": fileData['streetName'],
      "houseNumber": fileData['houseNumber']
    }

    const recieverData = await request('http://localhost:3000/api/graphql', createCustomer, variables)

    // Create a customer entry for the person who ordered
    variables = {
        "city": fileData['client']['city'],
        "email": fileData['client']['email'],
        "firstName": fileData['client']['firstName'],
        "lastName": fileData['client']['lastName'],
        "phoneNumber": fileData['client']['phoneNumber'],
        "postalCode": fileData['client']['postalCode'],
        "streetName": fileData['client']['streetName'],
        "houseNumber": fileData['client']['houseNumber']
    }

    const customerData = await request('http://localhost:3000/api/graphql', createCustomer, variables)


    // create the order coupled with the previously created customer and reciever
    const createOrder = gql
    `
    mutation CreateOrder($customerId: Int!, $employeeId: Int!, $recieverId: Int!, $productInfo: String, $message: String, $extraInfo: String, $cardType: CardType, $includeDelivery: Boolean, $price: Float, $dateOfDelivery: String, $orderState: OrderState, $paymentMethod: PaymentMethod) {
        createOrder(customerId: $customerId, employeeId: $employeeId, recieverId: $recieverId, productInfo: $productInfo, message: $message, extraInfo: $extraInfo, cardType: $cardType, includeDelivery: $includeDelivery, price: $price, dateOfDelivery: $dateOfDelivery, orderState: $orderState, paymentMethod: $paymentMethod) {
          id
          price
          customerId
          employeeId
          recieverId
          message
          extraInfo
          productInfo
          dateOfDelivery
          orderDate
          includeDelivery
          cardType
          orderState
          paymentMethod
        }
      }
    `

    variables = {
        "recieverId": recieverData['createCustomer']['id'],
        "customerId": customerData['createCustomer']['id'],
        "employeeId": 1,
        "productInfo": fileData['description'],
        "message": fileData['cardText'],
        "extraInfo": fileData['comments'],
        "cardType": fileData['withCard'],
        "includeDelivery": fileData['withDeliveryCosts'],
        "price": fileData['price'],
        "dateOfDelivery": fileData['deliveryDate'],
        "orderState": "OPEN",
        "paymentMethod": "PIN",
    }

    const orderData = await request('http://localhost:3000/api/graphql', createOrder, variables)

    const { frameworks } = orderData
    return {
      props: {
        frameworks,
      },
    }
    return fileData;
}