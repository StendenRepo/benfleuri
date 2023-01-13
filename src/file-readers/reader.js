import { extractPimmSolutionsFormData } from "./eml-reader/pimmFormReader";
import { extractWebbloemenData } from "./pdf-reader/webbloemenReader";
import { extractOrderFormData } from "./eml-reader/websiteFormReader";
import { extractEurofloristData } from "./pdf-reader/eurofloristReader";
import { extractWyBloemistenData } from "./pdf-reader/wyBloemistenReader";
import { request, gql } from 'graphql-request'


/**
 * This function checks which reader function is needed to read the given file
 * It then puts the extracted data in the fileData variable
 * And creates the reciever, customer and order variables
 * It then calls the insertIntoDatabase function and passes the variables with it
 * @param {*} file: Selected file that needs to be read
 * @returns The query result
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
        

        // Reciever variables from fileData that neeed to be stored in the database
        var recieverVariables = {
            "firstName": fileData['firstName'],
            "lastName": fileData['lastName'],
            "city": fileData['city'],
            "phoneNumber": fileData['phoneNumber'],
            "email": fileData['email'],
            "postalCode": fileData['postalCode'],
            "streetName": fileData['streetName'],
            "houseNumber": fileData['houseNumber']
        }

        // Customer variables from fileData that neeed to be stored in the database
        
        var customerVariables = {
            "firstName": fileData['client']['firstName'],
            "lastName": fileData['client']['lastName'],
            "city": fileData['client']['city'],
            "phoneNumber": fileData['client']['phoneNumber'],
            "email": fileData['client']['email'],
            "postalCode": fileData['client']['postalCode'],
            "streetName": fileData['client']['streetName'],
            "houseNumber": fileData['client']['houseNumber']
        }

        var orderVariables = {
            "recieverId": 1,
            "customerId": 1,
            "employeeId": 1,
            "productInfo": fileData['description'],
            "message": fileData['cardText'],
            "extraInfo": fileData['comments'],
            "cardType": fileData['withCard'],
            "includeDelivery": fileData['withDeliveryCosts'],
            "price": fileData['price'],
            // "dateOfDelivery": fileData['deliveryDate'],
            "orderState": "OPEN",
            "paymentMethod": "PIN",
        }

        const allVariables = {
            recieverVariables,
            customerVariables,
            orderVariables,
            fileData
        }

        const queryResult = await insertIntoDatabase(allVariables)
        return queryResult

    } catch (error) {
        console.log(error)
        return null
    }
}


/**
 * This function inserts the data into the database after checking if the data already exists.
 * @param {*} allVariables: object with all needed variables
 * @returns The data that was inserted in the database
 */
async function insertIntoDatabase(allVariables) {
    var recieverData = {}
    var customerData = {}
    var orderData = {}

    var orderVariables = allVariables['orderVariables']
    var customerVariables = allVariables['customerVariables']
    var recieverVariables = allVariables['recieverVariables']
    var fileData = allVariables['fileData']

    var customerInDatabase = false
    var recieverInDatabase = false

    // Check if the customer that needs to be inserted is already in the database
    const allCustomers = await findCustomers()
    allCustomers['findAllCustomers'].map((customer) => {
        const id = customer['id']
        delete(customer.id)
        // If the customer is present, couple the existing customerId to the new order
        if(JSON.stringify(customer) == JSON.stringify(customerVariables)) {
            orderVariables.customerId = id
            customerInDatabase = true
            customerData = customer
        }
        if(JSON.stringify(customer) == JSON.stringify(recieverVariables)) {
            orderVariables.recieverId = id
            recieverInDatabase = true
            recieverData = customer
        }
    })

    // If reciever does not exist, create it and set the order recieverId to the new reciever
    if(!recieverInDatabase) {
        recieverData = await createReciever(recieverVariables)
        orderVariables.recieverId = recieverData['createCustomer']['id']
    }

    // If customer does not exist, create it and set the order customerId to the new customer
    if(!customerInDatabase) {
        customerData = await createCustomer(customerVariables)
        orderVariables.customerId = customerData['createCustomer']['id']
    }


    // If the order does not exist, create it
    if(!await orderInDatabase(orderVariables)) {
        orderVariables['dateOfDelivery'] = fileData['deliveryDate']
        orderData = await createOrder(orderVariables)
    }

    // add all inserted data together and return and log it
    const insertedData = {
        recieverData,
        customerData,
        orderData
    }

    console.log(insertedData)

    const { frameworks } = insertedData
    return {
        props: {
            frameworks,
        },
    }
}


/**
 * @returns array with all customers from database
 */
async function findCustomers() {
    const findCustomers = gql
    `
    query FindAllCustomers {
        findAllCustomers {
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
    const allCustomers = await request('http://localhost:3000/api/graphql', findCustomers)
    return allCustomers
}


/**
 * @returns array with all orders from database
 */
async function findOrders() {
    const findOrders = gql
    `
    query FindAllOrders {
        findAllOrders {
            recieverId
            customerId
            employeeId
            productInfo
            message
            extraInfo
            cardType
            includeDelivery
            price
            orderState
            paymentMethod
        }
        }
    `
    const response = await request('http://localhost:3000/api/graphql', findOrders)
    return response
}


/**
 * @param {*} recieverVariables: Object with reciever variables for in the databaes
 * @returns The inserted data
 */
async function createReciever(recieverVariables) {
    const createCustomer = gql
    `
    mutation CreateCustomer($firstName: String!, $lastName: String!, $phoneNumber: String!, $city: String, $streetName: String, $postalCode: String, $email: String, $houseNumber: String) {
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
    const response = await request('http://localhost:3000/api/graphql', createCustomer, recieverVariables)
    return response
}


/**
 * 
 * @param {*} customerVariables: Object with customer variables for in the database 
 * @returns The inserted data
 */
async function createCustomer(customerVariables) {
    const createCustomer = gql
    `
    mutation CreateCustomer($firstName: String!, $lastName: String!, $phoneNumber: String!, $city: String, $streetName: String, $postalCode: String, $email: String, $houseNumber: String) {
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
    const response = await request('http://localhost:3000/api/graphql', createCustomer, customerVariables)
    return response
}


/**
 * 
 * @param {*} orderVariables Object with order variables for in the database
 * @returns The inserted data
 */
async function createOrder(orderVariables) {
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
    const response = await request('http://localhost:3000/api/graphql', createOrder, orderVariables)
    return response
}


/**
 * Checks if the order is already in the database
 * @param {*} orderVariables 
 * @returns True if order is in database, false if it is not
 */
async function orderInDatabase(orderVariables) {
    var orderIsInDatabase = false
    const allOrders = await findOrders()
    allOrders['findAllOrders'].map((order) => {
        if(JSON.stringify(order) == JSON.stringify(orderVariables)) {
            orderIsInDatabase = true
        }
    })
    return orderIsInDatabase
}