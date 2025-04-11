const { gql } = require("apollo-server-express");

const levelTypeDefs = gql`
  type Level {
    id: ID!
    levelName: String!
    targetScore: Int!
    description: String!
    studyGoal: String!
    createdAt: String
    updatedAt: String
  }

  input CreateLevelInput {
    levelName: String!
    targetScore: Int!
    description: String!
    studyGoal: String!
  }

  input UpdateLevelInput {
    levelName: String
    targetScore: Int
    description: String
    studyGoal: String
  }

  type Query {
    getAllLevels: [Level]
    getLevelById(id: ID!): Level
  }

  type Mutation {
    createLevel(input: CreateLevelInput!): Level
    updateLevel(id: ID!, input: UpdateLevelInput!): Level
    deleteLevel(id: ID!): Boolean
  }
`;

module.exports = { typeDefs: levelTypeDefs };
