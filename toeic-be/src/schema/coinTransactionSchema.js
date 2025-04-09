const { gql } = require("apollo-server-express");

const coinTransactionTypeDefs = gql`
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

  enum CoinTransactionType {
    earn
    spend
    purchase
  }

  input CreateCoinTransactionInput {
    userId: ID!
    type: CoinTransactionType!
    amount: Int!
    description: String
    referenceId: ID
  }

  type Query {
    getCoinTransactionsByUser(userId: ID!): [CoinTransaction]
    getCoinTransactionById(id: ID!): CoinTransaction
    getAllCoinTransactions: [CoinTransaction]
  }

  type Mutation {
    createCoinTransaction(input: CreateCoinTransactionInput!): CoinTransaction
  }
`;

module.exports = { typeDefs: coinTransactionTypeDefs };
