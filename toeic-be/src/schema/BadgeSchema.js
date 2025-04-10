const { gql } = require("apollo-server-express");

const badgeSchema = gql`
  type Badge {
    id: ID!
    name: String!
    description: String
    image: String
  }

  input CreateBadgeInput {
    name: String!
    description: String
    image: String
  }

  input UpdateBadgeInput {
    name: String
    description: String
    image: String
  }

  type BadgeResponse {
    success: Boolean!
    message: String!
    badge: Badge
  }

  extend type Query {
    badges: [Badge]
    badge(id: ID!): Badge
  }

  extend type Mutation {
    createBadge(input: CreateBadgeInput!): Badge
    updateBadge(id: ID!, input: UpdateBadgeInput!): Badge
    deleteBadge(id: ID!): BadgeResponse
  }
`;

module.exports = { badgeSchema };
