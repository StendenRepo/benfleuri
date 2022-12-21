import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  #graphql
  type Order {
    id: Int
    customerId: Int
    employeeId: Int
    recieverId: Int
    productInfo: String
    message: String
    extraInfo: String
    cardType: Int
    includeDelivery: boolean
    price: decimal
  }
`;
