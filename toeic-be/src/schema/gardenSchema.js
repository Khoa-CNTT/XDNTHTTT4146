const { gql } = require("apollo-server-express");

module.exports = gql`
  type Garden {
    id: ID!
    name: String!
    description: String
    courseId: ID
    course: Course
    items: [GardenItem]
  }

  type GardenItem {
    id: ID!
    gardenId: ID!
    name: String!
    meaning: String
    example: String
  }

  extend type Query {
    getAllGardens: [Garden]
    getGarden(id: ID!): Garden
    getGardenItems(gardenId: ID!): [GardenItem]
  }

  extend type Mutation {
    createGarden(name: String!, description: String, courseId: ID): Garden
    createGardenItem(
      gardenId: ID!
      name: String!
      meaning: String
      example: String
    ): GardenItem
  }
`;
