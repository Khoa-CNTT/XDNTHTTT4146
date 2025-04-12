const { gql } = require("apollo-server-express");

module.exports = gql`
  type MockTest {
    id: ID!
    name: String!
    description: String
    courseId: ID
    createdAt: String
    updatedAt: String
  }

  type MockResult {
    id: ID!
    userId: ID!
    questionId: ID!
    answer: String!
    isCorrect: Boolean!
    createdAt: String
    updatedAt: String
  }

  extend type Query {
    getMockTests: [MockTest]
    getMockTest(id: ID!): MockTest
    getMockResultsByUser(userId: ID!): [MockResult]
  }

  extend type Mutation {
    createMockTest(name: String!, description: String, courseId: ID): MockTest
    submitMockResult(
      userId: ID!
      questionId: ID!
      answer: String!
      isCorrect: Boolean!
    ): MockResult
  }
`;
