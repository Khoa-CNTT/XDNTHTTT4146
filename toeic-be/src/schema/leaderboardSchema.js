const { gql } = require("apollo-server-express");

const leaderboardTypeDefs = gql`
  type Leaderboard {
    id: ID!
    user_id: ID!
    total_exp: Int!
    rank: Int!
    last_updated: String!
    user: User
  }

  input CreateLeaderboardInput {
    user_id: ID!
    total_exp: Int!
    rank: Int!
  }

  input UpdateLeaderboardInput {
    total_exp: Int
    rank: Int
  }

  type Query {
    getLeaderboard: [Leaderboard]
    getTopNLeaderboard(limit: Int!): [Leaderboard]
    getUserRank(userId: ID!): Leaderboard
  }

  type Mutation {
    createLeaderboard(input: CreateLeaderboardInput!): Leaderboard
    updateLeaderboard(id: ID!, input: UpdateLeaderboardInput!): Leaderboard
    deleteLeaderboard(id: ID!): Boolean
  }
`;

module.exports = { typeDefs: leaderboardTypeDefs };
