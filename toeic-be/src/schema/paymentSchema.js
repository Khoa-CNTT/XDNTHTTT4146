const { gql } = require("apollo-server-express");

module.exports = gql`
  type Payment {
    id: ID!
    userId: ID!
    amount: Float!
    coin: Int
    type: String!
    refId: ID
    refModel: String
    status: String!
    method: String
    createdAt: String!
  }

  type PaymentResponse {
    message: String!
    payment: Payment
  }

  type Query {
    getMyPayments(userId: ID!): [Payment!]!
  }

  type Mutation {
    topUp(amount: Float!, method: String = "VNPAY"): PaymentResponse!
    buyCourse(courseId: ID!, method: String = "COIN"): PaymentResponse!
  }
`;
