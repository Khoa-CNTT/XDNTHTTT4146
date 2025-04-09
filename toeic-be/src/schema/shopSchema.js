const { gql } = require("apollo-server-express");

const shopSchema = gql`
  type Shop {
    id: ID!
    name: String!
    description: String
    image: String
    location: String
    status: String
    createdAt: String
    updatedAt: String
  }

  input CreateShopInput {
    name: String!
    description: String
    image: String
    location: String
    status: String
  }

  input UpdateShopInput {
    id: ID!
    name: String
    description: String
    image: String
    location: String
    status: String
  }

  type ShopPayload {
    message: String!
    shop: Shop
  }

  extend type Query {
    getAllShops: [Shop!]!
    getShopById(id: ID!): Shop
  }

  extend type Mutation {
    createShop(input: CreateShopInput!): ShopPayload!
    updateShop(input: UpdateShopInput!): ShopPayload!
    deleteShop(id: ID!): Boolean!
  }
`;

module.exports = shopSchema;
