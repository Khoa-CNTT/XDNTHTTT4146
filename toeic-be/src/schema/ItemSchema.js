const { gql } = require("apollo-server-express");

const itemSchema = gql`
  scalar DateTime
  scalar JSON

  enum RarityType {
    common
    rare
    epic
    legendary
  }

  type Image {
    id: ID!
    url: String!
    name: String
    tag: String
    priority: Int
    metadata: JSON
  }

  type Item {
    id: ID!
    name: String!
    description: String
    price: Int!
    stock: Int!
    image: String
    category: String
    rarity: RarityType!
    effect: JSON
    isActive: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime
    images: [Image!]
  }

  input CreateItemInput {
    name: String!
    description: String
    price: Int!
    stock: Int
    image: String
    category: String
    rarity: RarityType!
    effect: JSON
    isActive: Boolean
  }

  input UpdateItemInput {
    name: String
    description: String
    price: Int
    stock: Int
    image: String
    category: String
    rarity: RarityType
    effect: JSON
    isActive: Boolean
  }

  type ItemResponse {
    success: Boolean!
    message: String!
    item: Item
  }

  extend type Query {
    getItemById(id: ID!): Item
    getAllItems(activeOnly: Boolean): [Item!]!
    getItemsByRarity(rarity: RarityType!): [Item!]!
    getItemsByCategory(category: String!): [Item!]!
  }

  extend type Mutation {
    createItem(input: CreateItemInput!): ItemResponse!
    updateItem(id: ID!, input: UpdateItemInput!): ItemResponse!
    deleteItem(id: ID!): ItemResponse!
  }
`;

module.exports = { itemSchema };
