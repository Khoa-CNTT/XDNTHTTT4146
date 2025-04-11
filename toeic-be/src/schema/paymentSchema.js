const { gql } = require("apollo-server-express");

const paymentSchema = gql`
  scalar JSON

  enum PaymentMethod {
    VNPAY
    MOMO
    PAYPAL
    BANK
    CASH
  }

  enum PaymentStatus {
    pending
    completed
    failed
    refunded
  }

  type Payment {
    id: ID!
    userId: ID!
    courseId: ID
    couponId: ID
    amount: Float!
    finalAmount: Float!
    method: PaymentMethod!
    status: PaymentStatus!
    transactionId: String
    invoiceCode: String
    metadata: JSON
    paymentDate: String!
    createdAt: String!
    updatedAt: String!

    user: User
    course: Course
    coupon: Coupon
  }

  input CreatePaymentInput {
    userId: ID!
    courseId: ID
    couponId: ID
    amount: Float!
    finalAmount: Float!
    method: PaymentMethod!
    transactionId: String
    invoiceCode: String
    metadata: JSON
    paymentDate: String
  }

  input UpdatePaymentInput {
    status: PaymentStatus
    transactionId: String
    invoiceCode: String
    metadata: JSON
    finalAmount: Float
  }

  type PaymentResponse {
    success: Boolean!
    message: String!
    payment: Payment
  }

  extend type Query {
    getPaymentById(id: ID!): Payment
    getPaymentsByUser(userId: ID!): [Payment!]!
    getAllPayments: [Payment!]!
  }

  extend type Mutation {
    createPayment(input: CreatePaymentInput!): PaymentResponse!
    updatePayment(id: ID!, input: UpdatePaymentInput!): PaymentResponse!
    deletePayment(id: ID!): Boolean!
  }
`;

module.exports = paymentSchema;
