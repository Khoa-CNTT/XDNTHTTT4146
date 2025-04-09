const { gql } = require("apollo-server-express");

const enrollmentTypeDefs = gql`
  type Enrollment {
    id: ID!
    userId: ID!
    courseId: ID!
    status: EnrollmentStatus!
    user: User
    course: Course
    createdAt: String
    updatedAt: String
  }

  enum EnrollmentStatus {
    active
    inactive
  }

  input EnrollInput {
    userId: ID!
    courseId: ID!
    status: EnrollmentStatus
  }

  input UpdateEnrollmentInput {
    status: EnrollmentStatus
  }

  type Query {
    getAllEnrollments: [Enrollment]
    getEnrollmentById(id: ID!): Enrollment
    getEnrollmentsByUser(userId: ID!): [Enrollment]
    getEnrollmentsByCourse(courseId: ID!): [Enrollment]
  }

  type Mutation {
    enrollUser(input: EnrollInput!): Enrollment
    updateEnrollment(id: ID!, input: UpdateEnrollmentInput!): Enrollment
    deleteEnrollment(id: ID!): Boolean
  }
`;

module.exports = { typeDefs: enrollmentTypeDefs };
