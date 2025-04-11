const { gql } = require("apollo-server-express");

const missionTypeDefs = gql`
  enum MissionType {
    daily
    weekly
    event
    custom
  }

  type Mission {
    id: ID!
    title: String!
    description: String
    type: MissionType!
    goal: Int!
    action: String!
    rewardExp: Int!
    rewardCoins: Int!
    isActive: Boolean!
    startDate: String
    endDate: String
    createdAt: String!
    updatedAt: String!
  }

  input MissionInput {
    title: String!
    description: String
    type: MissionType
    goal: Int!
    action: String!
    rewardExp: Int
    rewardCoins: Int
    isActive: Boolean
    startDate: String
    endDate: String
  }

  type MissionResponse {
    status: Boolean!
    msg: String!
    mission: Mission
  }

  extend type Query {
    getMissions(type: MissionType, activeOnly: Boolean): [Mission!]!
    getMissionById(id: ID!): Mission
  }

  extend type Mutation {
    createMission(input: MissionInput!): MissionResponse!
    updateMission(id: ID!, input: MissionInput!): MissionResponse!
    deleteMission(id: ID!): MissionResponse!
  }
`;

module.exports = { typeDefs: missionTypeDefs };
