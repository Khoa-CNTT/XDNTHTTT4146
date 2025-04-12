const { gql } = require("apollo-server-express");

const coinTransactionSchema = gql`
  scalar JSON

  enum CoinTransactionType {
    earn
    spend
    purchase
  }

  type CoinTransaction {
    id: ID!
    userId: ID!
    type: CoinTransactionType!
    amount: Int!
    description: String
    referenceId: ID
    metadata: JSON
    createdAt: String
    updatedAt: String
    user: User
  }

  input CreateCoinTransactionInput {
    userId: ID!
    type: CoinTransactionType!
    amount: Int!
    description: String
    referenceId: ID
    metadata: JSON
  }

  type CoinTransactionResponse {
    success: Boolean!
    message: String
    balance: Int
    transaction: CoinTransaction
  }

  extend type Query {
    getCoinTransactionsByUser(
      userId: ID!
      type: CoinTransactionType
      limit: Int
    ): [CoinTransaction]
    getCoinTransactionById(id: ID!): CoinTransaction
    getAllCoinTransactions: [CoinTransaction]
    getUserCoinBalance(userId: ID!): Int
  }

  extend type Mutation {
    createCoinTransaction(
      input: CreateCoinTransactionInput!
    ): CoinTransactionResponse
  }
`;

module.exports = { coinTransactionSchema };
