const { gql } = require("apollo-server-express");

const rewardSchema = gql`
  type Reward {
    id: ID!
    name: String!
    description: String
    image: String
    createdAt: String!
    updatedAt: String!
  }

  input CreateRewardInput {
    name: String!
    description: String
    image: String
  }

  input UpdateRewardInput {
    id: ID!
    name: String
    description: String
    image: String
  }

  type RewardPayload {
    message: String!
    reward: Reward
  }

  extend type Query {
    getAllRewards: [Reward!]!
    getRewardById(id: ID!): Reward
  }

  extend type Mutation {
    createReward(input: CreateRewardInput!): RewardPayload!
    updateReward(input: UpdateRewardInput!): RewardPayload!
    deleteReward(id: ID!): Boolean!
  }
`;

module.exports = rewardSchema;
