const { gql } = require("apollo-server-express");

const paymentTypeDefs = gql`
  type Payment {
    id: ID!
    userId: ID!
    amount: Float!
    method: PaymentMethod!
    status: PaymentStatus!
    transactionId: String
    paymentDate: String
    createdAt: String
    updatedAt: String
  }

  enum PaymentMethod {
    VNPAY
    MOMO
  }

  enum PaymentStatus {
    pending
    completed
    failed
  }

  input CreatePaymentInput {
    userId: ID!
    amount: Float!
    method: PaymentMethod!
  }

  type Query {
    getPaymentsByUser(userId: ID!): [Payment]
    getAllPayments: [Payment]
    getPaymentById(id: ID!): Payment
  }

  type Mutation {
    createPayment(input: CreatePaymentInput!): Payment
    updatePaymentStatus(id: ID!, status: PaymentStatus!): Payment
  }
`;

module.exports = { typeDefs: paymentTypeDefs };
