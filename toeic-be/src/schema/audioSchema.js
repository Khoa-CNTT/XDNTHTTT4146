const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Audio {
    id: ID!
    url: String!
  }

  input UploadAudioInput {
    url: String!
  }

  type Mutation {
    uploadAudio(input: UploadAudioInput!): Audio!
  }

  type Query {
    getAllAudios: [Audio!]!
  }
`;
module.exports = { typeDefs };
