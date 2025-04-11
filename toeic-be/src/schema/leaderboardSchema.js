const { gql } = require("apollo-server-express");

const leaderboardSchema = gql`
  enum LeaderboardType {
    daily
    weekly
    monthly
    event
  }

  enum LeaderboardScope {
    global
    tower
    garden
    event
  }

  type Leaderboard {
    id: ID!
    userId: ID!
    totalExp: Int!
    rank: Int!
    type: LeaderboardType!
    scope: LeaderboardScope!
    scopeId: ID
    scopeModel: String
    period: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  input LeaderboardFilterInput {
    type: LeaderboardType
    scope: LeaderboardScope
    scopeId: ID
    period: String
  }

  extend type Query {
    getLeaderboard(filter: LeaderboardFilterInput!): [Leaderboard!]!
    getUserRank(userId: ID!, filter: LeaderboardFilterInput!): Leaderboard
  }
`;

module.exports = leaderboardSchema;
