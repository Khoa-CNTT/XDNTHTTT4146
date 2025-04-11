const { gql } = require("apollo-server-express");

const courseUserSchema = gql`
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
    createdAt: DateTime!
    updatedAt: DateTime!

    user: User
    course: Course
  }

  input CreateCourseUserInput {
    userId: ID!
    courseId: ID!
    status: CourseUserStatus = active
    progress: Float = 0
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
    getAllCourseUsers: [CourseUser!]!
    getCourseUserById(id: ID!): CourseUser
    getCourseUsersByUser(userId: ID!): [CourseUser!]!
    getCourseUsersByCourse(courseId: ID!): [CourseUser!]!
  }

  extend type Mutation {
    createCourseUser(input: CreateCourseUserInput!): CourseUserResponse!
    updateCourseUser(
      id: ID!
      input: UpdateCourseUserInput!
    ): CourseUserResponse!
    deleteCourseUser(id: ID!): CourseUserResponse!
  }
`;

module.exports = { courseUserSchema };
