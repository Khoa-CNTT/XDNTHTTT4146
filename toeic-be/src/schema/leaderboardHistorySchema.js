const { gql } = require("apollo-server-express");

const leaderboardHistorySchema = gql`
  scalar DateTime

  enum LeaderboardType {
    exp
    garden
    tower
    event
  }

  type LeaderboardHistory {
    id: ID!
    userId: ID!
    user: User
    totalExp: Int!
    rank: Int!
    date: String!
    week: String
    month: String
    type: LeaderboardType!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  input RecordLeaderboardHistoryInput {
    userId: ID!
    totalExp: Int!
    rank: Int!
    type: LeaderboardType
    date: String
  }

  extend type Query {
    getTopPlayersByDate(
      date: String
      type: LeaderboardType
      limit: Int
    ): [LeaderboardHistory!]!
    getUserLeaderboardHistory(
      userId: ID!
      type: LeaderboardType
    ): [LeaderboardHistory!]!
    getUserRankByDate(
      userId: ID!
      date: String
      type: LeaderboardType
    ): LeaderboardHistory
  }

  extend type Mutation {
    recordLeaderboardHistory(
      input: RecordLeaderboardHistoryInput!
    ): LeaderboardHistory!
  }
`;

module.exports = { leaderboardHistorySchema };
