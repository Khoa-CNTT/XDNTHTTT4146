const { gql } = require("apollo-server-express");

module.exports = gql`
  type MasteryRoad {
    id: ID!
    name: String!
    description: String
    courseId: ID
    towerId: ID
    gardenId: ID
    difficultyLevel: String!
    status: String!
  }

  # Queries cho MasteryRoad
  type Query {
    getMasteryRoads(courseId: ID): [MasteryRoad]
    getMasteryRoad(id: ID!): MasteryRoad
  }

  # Mutations cho MasteryRoad
  type Mutation {
    createMasteryRoad(
      name: String!
      description: String
      courseId: ID
      towerId: ID
      gardenId: ID
      difficultyLevel: String!
      status: String!
    ): MasteryRoad
    updateMasteryRoad(
      id: ID!
      name: String!
      description: String
      courseId: ID
      towerId: ID
      gardenId: ID
      difficultyLevel: String!
      status: String!
    ): MasteryRoad
    deleteMasteryRoad(id: ID!): Boolean
  }
`;
