const { gql } = require("apollo-server-express");

module.exports = gql`
  type Badge {
    id: ID!
    name: String!
    description: String
    image: String
  }

  type BadgeResponse {
    success: Boolean!
    message: String!
  }

  type Query {
    badges: [Badge]
    badge(id: ID!): Badge
  }

  type Mutation {
    createBadge(name: String!, description: String, image: String): Badge
    updateBadge(
      id: ID!
      name: String
      description: String
      image: String
    ): Badge
    deleteBadge(id: ID!): BadgeResponse
  }
`;
