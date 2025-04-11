const { gql } = require("apollo-server-express");

const expLevelSchema = gql`
  type ExpLevel {
    level: Int!
    requiredExp: Int!
  }

  input CreateExpLevelInput {
    level: Int!
    requiredExp: Int!
  }

  input UpdateExpLevelInput {
    requiredExp: Int!
  }

  type ExpLevelResponse {
    success: Boolean!
    message: String!
    expLevel: ExpLevel
  }

  extend type Query {
    getAllExpLevels: [ExpLevel!]!
    getExpLevel(level: Int!): ExpLevel
    getNextExpLevel(currentLevel: Int!): ExpLevel
  }

  extend type Mutation {
    createExpLevel(input: CreateExpLevelInput!): ExpLevelResponse!
    updateExpLevel(level: Int!, input: UpdateExpLevelInput!): ExpLevelResponse!
    deleteExpLevel(level: Int!): ExpLevelResponse!
  }
`;

module.exports = { expLevelSchema };
