const { gql } = require("apollo-server-express");

const typeDefs = gql`
  # Type Definitions cho Floor
  type Floor {
    id: ID!
    floor: Int!
    miniGame: MiniGame
    toeicScore: Int!
    tower: Tower
  }

  # Queries cho Floor
  type Query {
    getAllFloors(towerId: ID!): [Floor]
  }

  # Mutations cho Floor
  type Mutation {
    createFloor(
      towerId: ID!
      floor: Int!
      miniGameId: ID!
      toeicScore: Int!
    ): Floor
  }
`;
module.exports = { typeDefs };
