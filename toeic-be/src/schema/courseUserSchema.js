const { gql } = require("apollo-server-express");

const courseUserTypeDefs = gql`
  scalar DateTime

  enum CourseUserStatus {
    active
    inactive
    completed
    expired
  }

  type CourseUser {
    id: ID!
    userId: ID!
    courseId: ID!
    status: CourseUserStatus!
    progress: Float!
    enrolledAt: DateTime!
    completedAt: DateTime
    course: Course
    user: User
  }

  input EnrollCourseInput {
    userId: ID!
    courseId: ID!
  }

  input UpdateCourseUserInput {
    status: CourseUserStatus
    progress: Float
    completedAt: DateTime
  }

  type CourseUserResponse {
    success: Boolean!
    message: String!
    courseUser: CourseUser
  }

  extend type Query {
    getUserCourses(userId: ID!): [CourseUser!]!
    getCourseUsers(courseId: ID!): [CourseUser!]!
  }

  extend type Mutation {
    enrollCourse(input: EnrollCourseInput!): CourseUserResponse!
    updateCourseUser(
      id: ID!
      input: UpdateCourseUserInput!
    ): CourseUserResponse!
  }
`;

module.exports = { typeDefs: courseUserTypeDefs };
