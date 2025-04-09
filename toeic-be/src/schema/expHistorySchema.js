const { gql } = require("apollo-server-express");

const expHistoryTypeDefs = gql`
  type ExpHistory {
    id: ID!
    userId: ID!
    source: ExpSource!
    exp: Int!
    description: String
    createdAt: String
    updatedAt: String
    user: User
  }

  enum ExpSource {
    lesson
    game
    mission
    event
  }

  input AddExpHistoryInput {
    userId: ID!
    source: ExpSource!
    exp: Int!
    description: String
  }

  type Query {
    getExpHistoryByUser(userId: ID!): [ExpHistory]
    getAllExpHistory: [ExpHistory]
  }

  type Mutation {
    addExpHistory(input: AddExpHistoryInput!): ExpHistory
    deleteExpHistory(id: ID!): Boolean
  }
`;

module.exports = { typeDefs: expHistoryTypeDefs };
