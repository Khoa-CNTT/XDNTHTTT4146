const { gql } = require("apollo-server-express");

const courseTypeDefs = gql`
  type Course {
    id: ID!
    name: String!
    description: String
    price: Float!
    image: String
    status: CourseStatus!
    createdAt: String
    updatedAt: String
  }

  enum CourseStatus {
    active
    inactive
  }

  input CreateCourseInput {
    name: String!
    description: String
    price: Float!
    image: String
    status: CourseStatus
  }

  input UpdateCourseInput {
    name: String
    description: String
    price: Float
    image: String
    status: CourseStatus
  }

  type Query {
    getAllCourses: [Course]
    getCourseById(id: ID!): Course
  }

  type Mutation {
    createCourse(input: CreateCourseInput!): Course
    updateCourse(id: ID!, input: UpdateCourseInput!): Course
    deleteCourse(id: ID!): Boolean
  }
`;

module.exports = { typeDefs: courseTypeDefs };
