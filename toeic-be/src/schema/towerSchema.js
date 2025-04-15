const { gql } = require("apollo-server-express");

const typeDefs = gql`
  # Type Definitions cho Tower
  type Tower {
    id: ID!
    name: String!
    description: String
    image: String
    level: Int!
    exp: Int!
    userId: ID!
    floors: [Floor]
  }

  # Queries cho Tower
  type Query {
    getAllTowers: [Tower]
    getTower(id: ID!): Tower
  }

  # Mutations cho Tower
  type Mutation {
    createTower(
      name: String!
      description: String
      image: String
      level: Int!
      exp: Int!
      userId: ID!
    ): Tower
  }
`;
module.exports = { typeDefs };
