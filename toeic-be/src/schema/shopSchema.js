const { gql } = require("apollo-server-express");

const shopSchema = gql`
  enum ShopStatus {
    ACTIVE
    INACTIVE
    MAINTENANCE
  }

  type Shop {
    id: ID!
    name: String!
    description: String
    image: String
    location: String
    status: ShopStatus!
    createdAt: String
    updatedAt: String
  }

  input CreateShopInput {
    name: String!
    description: String
    image: String
    location: String
    status: ShopStatus = ACTIVE
  }

  input UpdateShopInput {
    name: String
    description: String
    image: String
    location: String
    status: ShopStatus
  }

  type ShopPayload {
    success: Boolean!
    message: String!
    shop: Shop
  }

  extend type Query {
    getAllShops: [Shop!]!
    getShopById(id: ID!): Shop
  }

  extend type Mutation {
    createShop(input: CreateShopInput!): ShopPayload!
    updateShop(id: ID!, input: UpdateShopInput!): ShopPayload!
    deleteShop(id: ID!): ShopPayload!
  }
`;

module.exports = shopSchema;
