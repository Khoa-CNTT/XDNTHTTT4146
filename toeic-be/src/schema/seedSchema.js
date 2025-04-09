const { gql } = require("apollo-server-express");

const seedSchema = gql`
  type Seed {
    id: ID!
    name: String!
    description: String
    total_words: Int!
    image: String
    createdAt: String
    updatedAt: String
  }

  input CreateSeedInput {
    name: String!
    description: String
    total_words: Int
    image: String
  }

  input UpdateSeedInput {
    id: ID!
    name: String
    description: String
    total_words: Int
    image: String
  }

  type SeedPayload {
    message: String!
    seed: Seed
  }

  extend type Query {
    getAllSeeds: [Seed!]!
    getSeedById(id: ID!): Seed
  }

  extend type Mutation {
    createSeed(input: CreateSeedInput!): SeedPayload!
    updateSeed(input: UpdateSeedInput!): SeedPayload!
    deleteSeed(id: ID!): Boolean!
  }
`;

module.exports = seedSchema;
