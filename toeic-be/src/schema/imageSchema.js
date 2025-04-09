const { gql } = require("apollo-server-express");

const imageTypeDefs = gql`
  type Image {
    id: ID!
    vocabularyId: ID!
    url: String!
    createdAt: String
    updatedAt: String
  }

  input UploadImageInput {
    vocabularyId: ID!
    base64Image: String!
  }

  type Mutation {
    uploadImage(input: UploadImageInput!): Image
  }

  type Query {
    imagesByVocabulary(vocabularyId: ID!): [Image]
  }
`;

module.exports = { typeDefs: imageTypeDefs };
