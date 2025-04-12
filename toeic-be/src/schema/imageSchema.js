const { gql } = require("apollo-server-express");

module.exports = gql`
  type Image {
    id: ID!
    url: String!
  }

  type Mutation {
    uploadImage(file: Upload!): Image!
  }

  type Query {
    getImage(id: ID!): Image
  }
`;
