const { gql } = require("apollo-server-express");

module.exports = gql`
  type Course {
    id: ID!
    name: String!
    description: String
    image: String
    price: Float!
    status: String!
  }

  type Query {
    getAllCourses: [Course]
    getCourse(id: ID!): Course
  }

  type Mutation {
    createCourse(
      name: String!
      description: String
      image: String
      price: Float!
      status: String
    ): Course

    updateCourse(
      id: ID!
      name: String
      description: String
      image: String
      price: Float
      status: String
    ): Course

    deleteCourse(id: ID!): Boolean
  }
`;
