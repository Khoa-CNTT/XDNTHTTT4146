const { gql } = require("apollo-server-express");

const rewardSchema = gql`
  type Reward {
    id: ID!
    name: String!
    description: String
    image: String
    type: RewardType!
    value: Int
    is_active: Boolean!
    createdAt: String
    updatedAt: String

    userRewards: [UserReward!]
    missions: [Mission!]
    missionsRewarded: [Mission!]
    users: [User!]
    paymentRewards: [Payment!]
  }

  enum RewardType {
    badge
    coin
    exp
    voucher
    custom
  }

  extend type Query {
    getAllRewards(activeOnly: Boolean): [Reward!]
    getRewardById(id: ID!): Reward
  }

  extend type Mutation {
    createReward(input: RewardInput!): Reward!
    updateReward(id: ID!, input: RewardInput!): Reward!
    deleteReward(id: ID!): Boolean!
  }

  input RewardInput {
    name: String!
    description: String
    image: String
    type: RewardType!
    value: Int
    is_active: Boolean
  }
`;

module.exports = rewardSchema;
