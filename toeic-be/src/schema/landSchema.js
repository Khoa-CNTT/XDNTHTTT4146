const { gql } = require("apollo-server-express");

const landTypeDefs = gql`
  enum LandStatus {
    FERTILE
    BARE
    DEPLETED
  }

  enum LandQuality {
    BAD
    NORMAL
    GOOD
    EXCELLENT
  }

  type Image {
    id: ID!
    url: String!
    alt: String
  }

  type Garden {
    id: ID!
    name: String!
  }

  type Land {
    id: ID!
    name: String!
    imageId: ID
    statusImageId: ID
    image: Image
    statusImage: Image
    description: String
    gardenId: ID
    garden: Garden
    status: LandStatus!
    fertility: Int!
    vocabularyCount: Int!
    quality: LandQuality!
    expBonus: Int
    lastPlantedAt: String
    price: Int!
    createdAt: String
    updatedAt: String
  }

  input LandInput {
    name: String!
    imageId: ID
    statusImageId: ID
    description: String
    gardenId: ID
    status: LandStatus
    fertility: Int
    vocabularyCount: Int
    quality: LandQuality
    expBonus: Int
    lastPlantedAt: String
    price: Int
  }

  type Query {
    getLand(id: ID!): Land
    getAllLands: [Land]
    getLandsByGarden(gardenId: ID!): [Land]
  }

  type Mutation {
    createLand(input: LandInput!): Land
    updateLand(id: ID!, input: LandInput!): Land
    deleteLand(id: ID!): Boolean
  }
`;

module.exports = landTypeDefs;
