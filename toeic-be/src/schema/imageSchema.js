const { gql } = require("apollo-server-express");

const imageSchema = gql`
  scalar DateTime
  scalar JSON

  type Image {
    id: ID!
    url: String!
    type: String!
    refId: ID!
    name: String
    tag: String
    priority: Int
    metadata: JSON
    createdAt: DateTime
    updatedAt: DateTime
  }

  input CreateImageInput {
    url: String!
    type: String!
    refId: ID!
    name: String
    tag: String
    priority: Int
    metadata: JSON
  }

  input UpdateImageInput {
    url: String
    name: String
    tag: String
    priority: Int
    metadata: JSON
  }

  type ImageResponse {
    success: Boolean!
    message: String!
    image: Image
  }

  extend type Query {
    getImageById(id: ID!): Image
    getImagesByTypeAndRef(type: String!, refId: ID!): [Image!]!
    getImagesByTag(tag: String!): [Image!]!
  }

  extend type Mutation {
    createImage(input: CreateImageInput!): ImageResponse!
    updateImage(id: ID!, input: UpdateImageInput!): ImageResponse!
    deleteImage(id: ID!): ImageResponse!
  }
`;

module.exports = { imageSchema };
