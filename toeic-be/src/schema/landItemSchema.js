const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type LandItem {
    id: ID!
    gardenItem: GardenItem
    land: Land
    plantedAt: String
  }

  # Queries cho LandItem
  type Query {
    getAllLandItems: [LandItem]
    getLandItem(id: ID!): LandItem
  }

  # Mutations cho LandItem
  type Mutation {
    createLandItem(gardenItemId: ID!, landId: ID!): LandItem
  }
`;
module.exports = { typeDefs };
