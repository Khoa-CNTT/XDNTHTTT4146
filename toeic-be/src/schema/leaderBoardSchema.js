const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    # Lấy leaderboard của một tuần hoặc tháng
    getLeaderboard(
      week: Int
      month: Int
      limit: Int
      offset: Int
    ): [Leaderboard]
  }

  type Mutation {
    # Cập nhật điểm học từ vựng của người dùng
    updateScore(
      userId: ID!
      week: Int
      month: Int
      score: Float!
    ): LeaderboardResponse
  }

  type Leaderboard {
    id: ID!
    userId: ID!
    week: Int!
    month: Int!
    score: Float!
    createdAt: String!
  }

  type LeaderboardResponse {
    message: String!
    leaderboard: Leaderboard
  }
`;

module.exports = typeDefs;
