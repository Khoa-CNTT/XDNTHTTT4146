const { gql } = require("apollo-server-express");

const expHistoryTypeDefs = gql`
  scalar DateTime

  enum ExpSourceType {
    lesson
    quiz
    game
    mission
    event
    vocabulary
    admin
    daily_mission
    challenge
  }

  type ExpHistory {
    id: ID!
    userId: ID!
    source: ExpSourceType!
    sourceId: ID
    vocabularyId: ID
    exp: Int!
    description: String
    metadata: JSON
    createdAt: DateTime!
  }

  input ExpHistoryFilterInput {
    userId: ID!
    source: ExpSourceType
    fromDate: DateTime
    toDate: DateTime
  }

  input CreateExpHistoryInput {
    userId: ID!
    source: ExpSourceType!
    sourceId: ID
    vocabularyId: ID
    exp: Int!
    description: String
    metadata: JSON
  }

  type ExpHistoryResponse {
    success: Boolean!
    message: String!
    history: ExpHistory
  }

  extend type Query {
    getUserExpHistory(filter: ExpHistoryFilterInput!): [ExpHistory!]!
  }

  extend type Mutation {
    createExpHistory(input: CreateExpHistoryInput!): ExpHistoryResponse!
  }
`;

module.exports = { typeDefs: expHistoryTypeDefs };
