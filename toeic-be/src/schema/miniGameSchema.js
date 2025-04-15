const { gql } = require("apollo-server-express");

const typeDefs = gql`
  # Type Definitions cho MiniGame
  type MiniGame {
    id: ID!
    name: String!
    description: String
  }

  # Queries cho MiniGame
  type Query {
    getAllMiniGames: [MiniGame]
    getMiniGame(id: ID!): MiniGame
  }

  # Mutations cho MiniGame
  type Mutation {
    createMiniGame(name: String!, description: String): MiniGame
    updateMiniGame(id: ID!, name: String!, description: String): MiniGame
    deleteMiniGame(id: ID!): Boolean
  }
`;
module.exports = { typeDefs };
