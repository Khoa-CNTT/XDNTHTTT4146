const { gql } = require("apollo-server-express");

module.exports = gql`
  type GardenItem {
    id: ID!
    garden: Garden
    item: Item
    position: String
    createdAt: String
  }

  # Queries cho GardenItem
  type Query {
    getAllGardenItems: [GardenItem]
    getGardenItem(id: ID!): GardenItem
  }

  # Mutations cho GardenItem
  type Mutation {
    createGardenItem(gardenId: ID!, itemId: ID!, position: String): GardenItem
  }
`;
