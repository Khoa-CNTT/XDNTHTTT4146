const { gql } = require("apollo-server-express");

const missionTypeDefs = gql`
  enum MissionType {
    daily
    weekly
    event
  }

  type Mission {
    id: ID!
    title: String!
    description: String
    type: MissionType!
    goal: Int!
    reward_exp: Int!
    reward_coins: Int!
    is_active: Boolean!
    createdAt: String
    updatedAt: String
  }

  input CreateMissionInput {
    title: String!
    description: String
    type: MissionType!
    goal: Int!
    reward_exp: Int!
    reward_coins: Int!
    is_active: Boolean
  }

  input UpdateMissionInput {
    title: String
    description: String
    type: MissionType
    goal: Int
    reward_exp: Int
    reward_coins: Int
    is_active: Boolean
  }

  type Query {
    getAllMissions: [Mission]
    getMissionById(id: ID!): Mission
  }

  type Mutation {
    createMission(input: CreateMissionInput!): Mission
    updateMission(id: ID!, input: UpdateMissionInput!): Mission
    deleteMission(id: ID!): Boolean
  }
`;

module.exports = { missionTypeDefs };
