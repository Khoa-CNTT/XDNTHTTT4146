const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    # Lấy lịch sử giao dịch của người dùng
    getTransactionHistory(userId: ID!, limit: Int, offset: Int): [Transaction]

    # Kiểm tra số dư của người dùng
    checkUserBalance(userId: ID!): Balance
  }

  type Mutation {
    # Mua item
    buyItem(userId: ID!, itemId: ID!, quantity: Int!): TransactionResponse

    # Hoàn tiền giao dịch
    refundTransaction(transactionId: ID!): RefundResponse
  }

  # Model Transaction
  type Transaction {
    id: ID!
    userId: ID!
    itemId: ID!
    number: Int!
    totalPrice: Float!
    status: String!
    paymentStatus: String!
    createdAt: String!
    updatedAt: String!

    # Thêm các trường để lấy thông tin người dùng và item
    user: User
    item: Item
  }

  # Thông tin phản hồi sau khi giao dịch thành công
  type TransactionResponse {
    message: String!
    transaction: Transaction
  }

  # Thông tin hoàn tiền giao dịch
  type RefundResponse {
    message: String!
  }

  # Thông tin người dùng
  type User {
    id: ID!
    email: String!
    fullName: String!
    avatar: String
    coin: Float!
  }

  # Thông tin item
  type Item {
    id: ID!
    name: String!
    description: String
    price: Float!
    status: String!
  }

  # Thông tin số dư của người dùng
  type Balance {
    coin: Float!
  }
`;

module.exports = typeDefs;
