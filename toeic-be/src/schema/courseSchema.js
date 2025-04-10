const { gql } = require("apollo-server-express");

const courseTypeDefs = gql`
  enum CourseStatus {
    active
    inactive
  }

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

  type CourseResponse {
    success: Boolean!
    message: String!
    course: Course
  }

  input CreateCourseInput {
    name: String!
    description: String
    price: Float!
    image: String
    status: CourseStatus = active
  }

  input UpdateCourseInput {
    name: String
    description: String
    price: Float
    image: String
    status: CourseStatus
  }

  type Query {
    getAllCourses: [Course!]!
    getCourseById(id: ID!): Course
  }

  type Mutation {
    createCourse(input: CreateCourseInput!): CourseResponse!
    updateCourse(id: ID!, input: UpdateCourseInput!): CourseResponse!
    deleteCourse(id: ID!): CourseResponse!
  }
`;

module.exports = { typeDefs: courseTypeDefs };
