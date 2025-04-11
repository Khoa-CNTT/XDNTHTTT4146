const { gql } = require("apollo-server-express");

const expLogTypeDefs = gql`
  scalar JSON
  scalar DateTime

  enum ExpSource {
    lesson
    quiz
    game
    mission
    event
    vocabulary
    challenge
    booster
    correction
    refund
    rollback
  }

  type ExpLog {
    id: ID!
    userId: ID!
    exp: Int!
    source: ExpSource!
    refId: ID
    metadata: JSON
    message: String
    isBonus: Boolean
    isReverted: Boolean
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  input CreateExpLogInput {
    userId: ID!
    exp: Int!
    source: ExpSource!
    refId: ID
    metadata: JSON
    message: String
    isBonus: Boolean
  }

  type ExpLogResponse {
    success: Boolean!
    message: String!
    expLog: ExpLog
  }

  extend type Query {
    getUserExpLogs(userId: ID!): [ExpLog!]!
    getExpLogById(id: ID!): ExpLog
  }

  extend type Mutation {
    createExpLog(input: CreateExpLogInput!): ExpLogResponse!
    revertExpLog(id: ID!): ExpLogResponse!
  }
`;

module.exports = { typeDefs: expLogTypeDefs };
