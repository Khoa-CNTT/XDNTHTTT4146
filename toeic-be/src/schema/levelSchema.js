const { gql } = require("apollo-server-express");

const levelSchema = gql`
  scalar DateTime

  type Level {
    id: ID!
    levelName: String!
    targetScore: Int!
    description: String!
    studyGoal: String!
    expRequired: Int!
    badgeId: ID
    order: Int!
    createdAt: DateTime!
    updatedAt: DateTime
  }

  input CreateLevelInput {
    levelName: String!
    targetScore: Int!
    description: String!
    studyGoal: String!
    expRequired: Int!
    badgeId: ID
    order: Int
  }

  input UpdateLevelInput {
    levelName: String
    targetScore: Int
    description: String
    studyGoal: String
    expRequired: Int
    badgeId: ID
    order: Int
  }

  type LevelResponse {
    success: Boolean!
    message: String!
    level: Level
  }

  extend type Query {
    getLevelById(id: ID!): Level
    getAllLevels: [Level!]!
  }

  extend type Mutation {
    createLevel(input: CreateLevelInput!): LevelResponse!
    updateLevel(id: ID!, input: UpdateLevelInput!): LevelResponse!
    deleteLevel(id: ID!): LevelResponse!
  }
`;

module.exports = { levelSchema };
