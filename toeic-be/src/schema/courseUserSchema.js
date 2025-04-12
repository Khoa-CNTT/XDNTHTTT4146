const { gql } = require("apollo-server-express");

module.exports = gql`
  type CourseUser {
    courseId: ID!
    userId: ID!
  }

  type Query {
    getUsersInCourse(courseId: ID!): [User]
    getCoursesOfUser(userId: ID!): [Course]
  }

  type Mutation {
    enrollUserInCourse(courseId: ID!, userId: ID!): CourseUser
    removeUserFromCourse(courseId: ID!, userId: ID!): Boolean
  }
`;
