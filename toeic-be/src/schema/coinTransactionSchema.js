const { gql } = require("apollo-server-express");

const coinTransactionSchema = gql`
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
    createdAt: String
    updatedAt: String
  }

  input CreateCoinTransactionInput {
    userId: ID!
    type: CoinTransactionType!
    amount: Int!
    description: String
    referenceId: ID
  }

  extend type Query {
    getCoinTransactionsByUser(userId: ID!): [CoinTransaction]
    getCoinTransactionById(id: ID!): CoinTransaction
    getAllCoinTransactions: [CoinTransaction]
  }

  extend type Mutation {
    createCoinTransaction(input: CreateCoinTransactionInput!): CoinTransaction
  }
`;

module.exports = { coinTransactionSchema };
