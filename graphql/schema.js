import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  #graphql

  scalar DateTime
  scalar currency

  type Customer {
  id: Int
  firsname: String
  lastname: String
  city: String
  phone_number: String
  email: String
  postcal_code: String
  street_name: String
  house_number: String
  order: [Order]
}

  type Reciever {
    id: Int
    name: String
    isAdmin: Boolean
    password: String
    order: [Order]
  }

  type Query {
    numberSix: Int! # Should always return the number 6 when queried
  }

  type Order {
    id: Int
    customerId: Int
    employeeId: Int
    recieverId: Int
    productInfo: String
    message: String
    extraInfo: String
    cardType: CardType
    includeDelivery: Boolean
    price: currency
    dateOfDelivery: DateTime
    PaymentMethod: PaymentMethod
    customer: [Customer]
    reciever: Reciever
    employee: Customer
  }

  enum CardType {
    NONE
    BASIC_CARD
    RIBBON
    SPECIAL_CARD
  }

  enum OrderState {
    OPEN
    CLOSED
    IN_PROGRESS
    DELIVERED
  }

  enum PaymentMethod {
    CASH
    PIN
    BY_INVOICE
  }
`;
