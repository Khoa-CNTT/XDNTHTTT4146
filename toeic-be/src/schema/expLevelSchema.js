const { gql } = require("apollo-server-express");

const expLevelTypeDefs = gql`
  type ExpLevel {
    level: Int!
    requiredExp: Int!
  }

  type LevelProgress {
    currentLevel: ExpLevel!
    nextLevel: ExpLevel
    currentExp: Int!
    expToNextLevel: Int
    progressRatio: Float!
  }

  extend type Query {
    getAllExpLevels: [ExpLevel!]!
    getUserLevel(userId: ID!): LevelProgress!
  }
`;

module.exports = { typeDefs: expLevelTypeDefs };
