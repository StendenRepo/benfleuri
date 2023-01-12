import { extractPimmSolutionsFormData } from "./eml-reader/pimmFormReader";
import { extractWebbloemenData } from "./pdf-reader/webbloemenReader";
import { extractOrderFormData } from "./eml-reader/websiteFormReader";
import { extractEurofloristData } from "./pdf-reader/eurofloristReader";
import { extractWyBloemistenData } from "./pdf-reader/wyBloemistenReader";
import { request, gql } from 'graphql-request'


/**
 * This function checks which reader function is needed to read the given file
 * It then puts the extracted data in the fileData variable
 * Next, the mutations are created to couple fileData to database columns, 
 * a call to the graphql api is made to insert the data into the databse
 * It inserts a reciever (customer), order (with the customerId coupled) and the person who ordered (also customer) 
 * At last the inserted data is returned
 */
export async function fileReader(file) {
    try {
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

        // Blueprint for creating a customer in the database (the reciever)
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

        // Create a customer (the person who ordered)
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

        // add all inserted data together and return it
        const insertedData = {
            recieverData,
            customerData,
            orderData
        }

        const { frameworks } = insertedData
        return {
            props: {
                frameworks,
            },
        }
    } catch(error) {
        console.log(error)
        return null
    }
}