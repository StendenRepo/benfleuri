import {gql, request} from "graphql-request";

/**
 * Returns all Orders from the database.
 *
 * @param {string} fields The fields that will be returned (Formatted as: 'id price customerId')
 *
 * @returns {Promise<any>}
 */
export async function getAllOrders(fields) {
    return await request('http://localhost:3000/api/graphql', "{findAllOrders {" + fields + "}}");
}

/**
 * Returns all Customers from the database.
 *
 * @param {string} fields The fields that will be returned (Formatted as: 'id firstName lastName')
 *
 * @returns {Promise<any>}
 */
export async function getAllCustomers(fields) {
    return await request('http://localhost:3000/api/graphql', "{findAllCustomers {" + fields + "}}");
}

/**
 * Gets the customer with the given ID.
 * @param customerId THe ID of the customer.
 *
 * @returns {Promise<{props: {FindCustomerById}}>}
 */
export async function getCustomerByID({customerId}){
    const query = gql`
query FindCustomerById($findCustomerByIdId: Int!) {
  findCustomerById(id: $findCustomerByIdId) {
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
}`

    let variables = {"findCustomerByIdId" : customerId}
    const data = await request('http://localhost:3000/api/graphql', query, variables)
    const {FindCustomerById} = data

    return {
        props: {
            FindCustomerById
        },
    }
}

/**
 * Returns all Employees from the database.
 *
 * @param {string} fields The fields that will be returned (Formatted as: 'id firstName lastName')
 *
 * @returns {Promise<any>}
 */
export async function getAllEmployees(fields) {
    return await request('http://localhost:3000/api/graphql', "{findAllEmployees {" + fields + "}}");
}

/**
 * Updates the given Order with new data.
 *
 * Returns the id of the added Order if successful or an error message if it failed.
 *
 * @param orderID
 * @param {int} customerId The unique ID of the customer.
 * @param {int} employeeId The unique ID of the employee.
 * @param {int} assignedEmployee The unique ID of the assigned employee.
 * @param {int} recieverId The unique ID of the receiver, this may sometimes be the same as the customerID.
 * @param {string} dateOfDelivery The date of the delivery as a string.
 * @param {number} price The price of the order.
 * @param {('CASH', 'PIN', 'BY_INVOICE')} paymentMethod The payment method.
 * @param {string} extraInfo Extra information about the order.
 * @param {string} productInfo The information about the order.
 * @param {string} productMessage The text that is added to the card.
 * @param {('OPEN', 'CLOSED', 'IN_PROGRESS', 'DELIVERED')} orderState The payment method.
 * @param {boolean} includeDelivery If delivery costs should be added to the order.
 * @param {('NONE', 'BASIC_CARD', 'RIBBON', 'SPECIAL_CARD')} cardType The type of the card included with the order.
 *
 * @returns {Promise<{error: {message: string}}|{props: {createOrder}}>}
 */
export async function updateOrder(orderID, customerId, employeeId, assignedEmployee, recieverId, dateOfDelivery, price, paymentMethod,
                               extraInfo, productInfo, productMessage, orderState, includeDelivery, cardType){
    //Check valid order state.
    if(!["OPEN","CLOSED", "IN_PROGRESS", "DELIVERED"].includes(orderState)) {
        return {error: {"message": "The gegeven order status is ongeldig (" + orderState + ")."}}
    }

    //Check valid card type.
    if(!["NONE","BASIC_CARD", "RIBBON", "SPECIAL_CARD"].includes(cardType)) {
        return {error: {"message": "The gegeven kaart selectie is ongeldig."}}
    }

    //Check valid payment method.
    if(!["CASH","PIN", "BY_INVOICE"].includes(paymentMethod)) {
        return {error: {"message": "The gegeven betaal methode is ongeldig."}}
    }

    //Check valid price.
    if(Number.isNaN(price)){
        return {error: {"message": "De gegeven prijs is ongeldig."}}
    }


    const query = gql`
mutation UpdateOrder($updateOrderId: Int, $customerId: ID, $employeeId: ID, $orderTreatingEmployeeId: ID, $productInfo: String, $message: String, $dateOfDelivery: String, $cardType: CardType, $extraInfo: String, $includeDelivery: Boolean, $price: Float, $orderState: OrderState, $paymentMethod: PaymentMethod) {
  updateOrder(id: $updateOrderId, customerId: $customerId, employeeId: $employeeId, orderTreatingEmployeeId: $orderTreatingEmployeeId, productInfo: $productInfo, message: $message, dateOfDelivery: $dateOfDelivery, cardType: $cardType, extraInfo: $extraInfo, includeDelivery: $includeDelivery, price: $price, orderState: $orderState, paymentMethod: $paymentMethod) {
    id
  }
}`

    let orderIDInt = parseInt(orderID)

    let variables = {"updateOrderId": orderIDInt, "customer" : customerId, "employee":  employeeId, "orderTreatingEmployee" : assignedEmployee,
        "reciever":  recieverId, "price":  price, "paymentMethod":  paymentMethod, "extraInfo": extraInfo, "productInfo": productInfo, "message": productMessage,
        "orderState": orderState, "includeDelivery": includeDelivery, "cardType": cardType, "dateOfDelivery" : dateOfDelivery}
    const data = await request('http://localhost:3000/api/graphql', query, variables)
    const {createOrder} = data

    return {
        props: {
            createOrder
        },
    }
}

/**
 * Adds an Order with the given values to the database.
 *
 * Returns the id of the added Order if successful or an error message if it failed.
 *
 * @param {int} customerId The unique ID of the customer.
 * @param {int} employeeId The unique ID of the employee.
 * @param {int} recieverId The unique ID of the receiver, this may sometimes be the same as the customerID.
 * @param {string} dateOfDelivery The date of the delivery as a string.
 * @param {number} price The price of the order.
 * @param {('CASH', 'PIN', 'BY_INVOICE')} paymentMethod The payment method.
 * @param {string} extraInfo Extra information about the order.
 * @param {string} productInfo The information about the order.
 * @param {string} productMessage The text that is added to the card.
 * @param {('OPEN', 'CLOSED', 'IN_PROGRESS', 'DELIVERED')} orderState The payment method.
 * @param {boolean} includeDelivery If delivery costs should be added to the order.
 * @param {('NONE', 'BASIC_CARD', 'RIBBON', 'SPECIAL_CARD')} cardType The type of the card included with the order.
 *
 * @returns {Promise<{error: {message: string}}|{props: {createOrder}}>}
 */
export async function addOrder(customerId, employeeId, recieverId, dateOfDelivery, price, paymentMethod,
                               extraInfo, productInfo, productMessage, orderState, includeDelivery, cardType){
    //Check valid order state.
    if(!["OPEN","CLOSED", "IN_PROGRESS", "DELIVERED"].includes(orderState)) {
        return {error: {"message": "The gegeven order status is ongeldig."}}
    }

    //Check valid card type.
    if(!["NONE","BASIC_CARD", "RIBBON", "SPECIAL_CARD"].includes(cardType)) {
        return {error: {"message": "The gegeven kaart selectie is ongeldig."}}
    }

    //Check valid payment method.
    if(!["CASH","PIN", "BY_INVOICE"].includes(paymentMethod)) {
        return {error: {"message": "The gegeven betaal methode is ongeldig."}}
    }

    //Check valid price.
    if(Number.isNaN(price)){
        return {error: {"message": "De gegeven prijs is ongeldig."}}
    }

    console.log(dateOfDelivery)

    if(!isValidDate(dateOfDelivery)){
        return {error: {"message": "De gegeven datum is ongeldig."}}
    }



    const query = gql`
    mutation CreateOrder($customerId: Int!, $employeeId: Int!, $recieverId: Int!, $dateOfDelivery: String, $price: Float, $paymentMethod: PaymentMethod, $extraInfo: String, $productInfo: String, $message: String, $orderState: OrderState, $includeDelivery: Boolean, $cardType: CardType, $orderTreatingEmployeeId: Int) {
    createOrder(orderTreatingEmployeeId: $orderTreatingEmployeeId, customerId: $customerId, employeeId: $employeeId, recieverId: $recieverId, dateOfDelivery: $dateOfDelivery, price: $price, paymentMethod: $paymentMethod, extraInfo: $extraInfo, productInfo: $productInfo, message: $message, orderState: $orderState, includeDelivery: $includeDelivery, cardType: $cardType) {
    id
    }
    }`

    let variables = {"customerId" : customerId, "employeeId":  employeeId, "recieverId":  recieverId, "dateOfDelivery":  dateOfDelivery,
        "price":  price, "paymentMethod":  paymentMethod, "extraInfo": extraInfo, "productInfo": productInfo, "message": productMessage,
        "orderState": orderState, "includeDelivery": includeDelivery, "cardType": cardType, "orderTreatingEmployeeId": 1}
    const data = await request('http://localhost:3000/api/graphql', query, variables)
    const {createOrder} = data

    return {
        props: {
            createOrder
        },
    }
}


/**
 * Adds a Customer with the given values to the database if he/she does not yet exist.
 *
 * Returns the id of the Customer and a boolean if it already existed in the database.
 * Or an error object with a message when something goes wrong.
 *
 * @param {string} firstName The first name of the Customer.
 * @param {string} lastName The last name of the Customer.
 * @param {string} phoneNumber The phone number of the Customer.
 * @param {string} city The city of the Customer.
 * @param {string} streetName The name of the street of the Customer.
 * @param {string} houseNumber The house number of the Customer (Is a string due to house numbers having letters (16B)).
 * @param {string} postalCode The postal code of the Customer.
 * @param {string|null} clientName The name of the client (optional).
 *
 * @returns {Promise<{error: {message: string}|exists: boolean, id}>}
 */
export async function addCustomerIfNotExists(firstName, lastName, phoneNumber,
                                             city, streetName, houseNumber, postalCode, clientName = null){
    //Validate length for postalCode and houseNumber.
    if(postalCode.length > 6){
        return {error: {"message": "De gegeven postcode voor " + firstName + " is ongeldig."}}
    }

    if(houseNumber.length > 6){
        return {error: {"message": "Het gegeven huisnummer voor " + firstName + " is ongeldig."}}
    }

    let customers = await getAllCustomers("id firstName lastName city postalCode")
    let exists = false;
    let id = -1;

    customers.findAllCustomers.some(value => {
        if(value.firstName === firstName &&
            value.lastName === lastName &&
            value.city === city &&
            value.postalCode === postalCode){
            //Already exists in database.
            console.log("in db")
            id = value.id;
            exists = true;
        }
        return exists
    })

    if(exists) {
        return {
            "exists": true,
            "id": id
        }
    }

    const query = gql`
mutation CreateCustomer($clientName: String, $firstName: String!, $lastName: String!, $phoneNumber: String!, $city: String, $email: String, $postalCode: String, $streetName: String, $houseNumber: String) {
  createCustomer(clientName: $clientName, firstName: $firstName, lastName: $lastName, phoneNumber: $phoneNumber, city: $city, email: $email, postalCode: $postalCode, streetName: $streetName, houseNumber: $houseNumber) {
    id
  }
}`

    let data = await request('http://localhost:3000/api/graphql',
        query, {"firstName" : firstName, "lastName":  lastName, "phoneNumber":  phoneNumber,
        "city":  city, "streetName":  streetName, "houseNumber": houseNumber, "postalCode": postalCode, "clientName": clientName})

    return {
        "exists": false,
        "id": data.createCustomer.id
    }
}

/**
 * Updates the given Customer with new data.
 *
 * Returns the id of the added Customer if successful or an error message if it failed.
 *
 *  @param {int} customerId The unique ID of the Customer that will be updated.
 *  @param {string} firstName The first name of the Customer.
 *  @param {string} lastName The last name of the Customer.
 *  @param {string} phoneNumber The phone number of the Customer.
 *  @param {string} city The city of the Customer.
 *  @param {string} streetName The name of the street of the Customer.
 *  @param {string} houseNumber The house number of the Customer (Is a string due to house numbers having letters (16B)).
 *  @param {string} postalCode The postal code of the Customer.
 *  @param {string|null} clientName The name of the client (optional).
 *
 *  @returns {Promise<{error: {message: string}|exists: boolean, id}>}
 *  */
export async function updateCustomer(customerId, firstName, lastName, phoneNumber, city, streetName, houseNumber, postalCode, clientName = null){
    //Validate length for postalCode and houseNumber.
    if(postalCode.length > 6){
        return {error: {"message": "De gegeven postcode voor " + firstName + " is ongeldig."}}
    }

    if(houseNumber.length > 6){
        return {error: {"message": "Het gegeven huisnummer voor " + firstName + " is ongeldig."}}
    }


    const query = gql`
mutation UpdateCustomer($updateCustomerId: Int!, $firstName: String!, $lastName: String!, $phoneNumber: String!, $clientName: String, $city: String, $streetName: String, $email: String, $houseNumber: String, $postalCode: String) {
  updateCustomer(id: $updateCustomerId, firstName: $firstName, lastName: $lastName, phoneNumber: $phoneNumber, clientName: $clientName, city: $city, streetName: $streetName, email: $email, houseNumber: $houseNumber, postalCode: $postalCode) {
    id
  }
}`

    let variables = {"updateCustomerId": customerId, "firstName" : firstName, "lastName":  lastName, "phoneNumber":  phoneNumber,
        "city":  city, "streetName":  streetName, "houseNumber": houseNumber, "postalCode": postalCode, "clientName": clientName}
    const data = await request('http://localhost:3000/api/graphql', query, variables)
    const {updateCustomer} = data

    return {
        props: {
            updateCustomer
        },
    }
}

/**
 * Validates that the input string is a valid date formatted as "dd/mm/yyyy"
 *
 * @param {string} dateString The date string.
 *
 * @returns True if the given date is valid, otherwise false.
 */
export function isValidDate(dateString) {
    // First check for the pattern
    if(!/^\d{1,2}-\d{1,2}-\d{4}$/.test(dateString)) {
        return false;
    }
    // Parse the date parts to integers
    var parts = dateString.split("-");
    var day = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10);
    var year = parseInt(parts[2], 10);

    // Check the ranges of month and year
    if(year < 1000 || year > 3000 || month === 0 || month > 12) {
        return false;
    }

    let monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
        monthLength[1] = 29;
    }

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
}