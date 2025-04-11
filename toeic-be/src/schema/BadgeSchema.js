const { gql } = require("apollo-server-express");

const badgeSchema = gql`
  scalar DateTime

  type Badge {
    id: ID!
    name: String!
    description: String
    image: String
    category: String
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  input CreateBadgeInput {
    name: String!
    description: String
    image: String
    category: String
  }

  input UpdateBadgeInput {
    name: String
    description: String
    image: String
    category: String
  }

  type BadgeResponse {
    success: Boolean!
    message: String!
    badge: Badge
  }

  extend type Query {
    badges(includeDeleted: Boolean = false): [Badge]
    badge(id: ID!): Badge
    deletedBadges: [Badge] # optional: dành cho scope onlyDeleted
  }

  extend type Mutation {
    createBadge(input: CreateBadgeInput!): BadgeResponse
    updateBadge(id: ID!, input: UpdateBadgeInput!): BadgeResponse
    deleteBadge(id: ID!): BadgeResponse
    restoreBadge(id: ID!): BadgeResponse # optional: support restore if needed
  }
`;

module.exports = { badgeSchema };
