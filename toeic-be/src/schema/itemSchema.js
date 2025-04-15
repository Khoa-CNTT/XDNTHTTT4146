const { gql } = require("apollo-server-express");

const typeDefs = gql`
  enum EffectType {
    XP
    TIME
    FERTILITY
  }

  enum ItemStatus {
    ACTIVE
    LOCKED
    DELETED
  }

  type Item {
    id: ID!
    name: String!
    description: String
    status: ItemStatus!
    effectType: EffectType
    effectValue: Int
  }

  type Mutation {
    useItem(userId: ID!, itemId: ID!): MessageResponse!
  }

  type Query {
    getItemsByUserId(userId: ID!): [Item]
  }

  type MessageResponse {
    message: String!
  }
`;
module.exports = { typeDefs };
