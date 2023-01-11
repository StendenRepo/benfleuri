import {gql, request} from "graphql-request";

export async function getAllOrders(fields) {
    return await request('http://localhost:3000/api/graphql', "{findAllOrders {" + fields + "}}");
}

export async function getAllCustomers(fields) {
    return await request('http://localhost:3000/api/graphql', "{findAllCustomers {" + fields + "}}");
}

export async function addOrder(){
    const query = gql`
mutation CreateOrder($customerId: Int!, $employeeId: Int!, $recieverId: Int!, $dateOfDelivery: String, $price: Float, $paymentMethod: PaymentMethod, $extraInfo: String, $productInfo: String, $message: String, $orderState: OrderState, $includeDelivery: Boolean, $cardType: CardType) {
  createOrder(customerId: $customerId, employeeId: $employeeId, recieverId: $recieverId, dateOfDelivery: $dateOfDelivery, price: $price, paymentMethod: $paymentMethod, extraInfo: $extraInfo, productInfo: $productInfo, message: $message, orderState: $orderState, includeDelivery: $includeDelivery, cardType: $cardType) {
    id
  }
}
  `
    const data = await request('http://localhost:3000/api/graphql', query,
        [1, 1, 1, "01-01-2022", 5, "PIN", "testextra", "testinfo", "testmessage", "OPEN", false, "NONE"])
    const {createOrder} = data

    return {
        props: {
            createOrder
        },
    }
}