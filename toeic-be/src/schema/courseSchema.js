const { gql } = require("apollo-server-express");

const courseTypeDefs = gql`
  scalar DateTime

  enum CourseStatus {
    active
    inactive
    archived
  }

  enum CourseLevel {
    beginner
    intermediate
    advanced
  }

  type Course {
    id: ID!
    name: String!
    description: String
    price: Float!
    image: String
    status: CourseStatus!
    category: String
    level: CourseLevel
    creatorId: ID
    createdAt: DateTime!
    updatedAt: DateTime!
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
    category: String
    level: CourseLevel
    creatorId: ID
  }

  input UpdateCourseInput {
    name: String
    description: String
    price: Float
    image: String
    status: CourseStatus
    category: String
    level: CourseLevel
  }

  extend type Query {
    getAllCourses: [Course!]!
    getCourseById(id: ID!): Course
  }

  extend type Mutation {
    createCourse(input: CreateCourseInput!): CourseResponse!
    updateCourse(id: ID!, input: UpdateCourseInput!): CourseResponse!
    deleteCourse(id: ID!): CourseResponse!
  }
`;

module.exports = { typeDefs: courseTypeDefs };
