const { gql } = require("apollo-server-express");

const invoiceSchema = gql`
  scalar JSON

  type Invoice {
    id: ID!
    paymentId: ID!
    invoiceCode: String!
    taxAmount: Float!
    discountAmount: Float!
    totalAmount: Float!
    issuedDate: String!
    createdAt: String!
    updatedAt: String!

    # Tính liên kết với Payment
    payment: Payment
  }

  # Input cho tạo mới Invoice
  input CreateInvoiceInput {
    paymentId: ID!
    invoiceCode: String!
    taxAmount: Float!
    discountAmount: Float!
    totalAmount: Float!
    issuedDate: String
  }

  # Input cho cập nhật Invoice
  input UpdateInvoiceInput {
    invoiceCode: String
    taxAmount: Float
    discountAmount: Float
    totalAmount: Float
    issuedDate: String
  }

  # Response cho kết quả Mutation Invoice
  type InvoiceResponse {
    success: Boolean!
    message: String!
    invoice: Invoice
  }

  extend type Mutation {
    # Tạo mới Invoice
    createInvoice(input: CreateInvoiceInput!): InvoiceResponse!

    # Cập nhật thông tin Invoice
    updateInvoice(id: ID!, input: UpdateInvoiceInput!): InvoiceResponse!

    # Xóa Invoice
    deleteInvoice(id: ID!): Boolean!
  }

  extend type Query {
    # Lấy Invoice theo ID
    getInvoiceById(id: ID!): Invoice

    # Lấy Invoice theo Payment ID
    getInvoiceByPaymentId(paymentId: ID!): Invoice

    # Lấy tất cả Invoices
    getAllInvoices: [Invoice!]!
  }
`;

module.exports = invoiceSchema;
