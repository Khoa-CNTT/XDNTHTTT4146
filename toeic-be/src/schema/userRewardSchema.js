const { gql } = require("apollo-server-express");

const userRewardSchema = gql`
  enum RewardSourceType {
    Mission
    Payment
    MiniGame
    Event
  }

  type UserReward {
    id: ID!
    userId: ID!
    rewardId: ID!
    sourceType: RewardSourceType!
    sourceId: ID!
    receivedAt: DateTime!
    note: String

    user: User
    reward: Reward
  }

  input CreateUserRewardInput {
    userId: ID!
    rewardId: ID!
    sourceType: RewardSourceType!
    sourceId: ID!
    note: String
  }

  extend type Query {
    getUserRewards(userId: ID!): [UserReward!]!
    getUserRewardById(id: ID!): UserReward
  }

  extend type Mutation {
    createUserReward(input: CreateUserRewardInput!): UserReward!
    deleteUserReward(id: ID!): Boolean!
  }
`;

module.exports = userRewardSchema;
