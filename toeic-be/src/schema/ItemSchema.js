const { gql } = require("apollo-server-express");

module.exports = gql`
  type Item {
    id: ID!
    name: String!
    description: String
    image: String
    price: Float!
    stock: Int!
    createdAt: String
    updatedAt: String
  }

  input CreateItemInput {
    name: String!
    description: String
    image: String
    price: Float!
    stock: Int
  }

  input UpdateItemInput {
    name: String
    description: String
    image: String
    price: Float
    stock: Int
  }

  type Query {
    getAllItems: [Item]
    getItemById(id: ID!): Item
  }

  type Mutation {
    createItem(input: CreateItemInput!): Item
    updateItem(id: ID!, input: UpdateItemInput!): Item
    deleteItem(id: ID!): Boolean
  }
`;
