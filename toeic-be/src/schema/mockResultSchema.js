const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type TestResult {
    id: ID!
    userId: ID!
    questionId: ID!
    floorId: ID
    answer: String!
    isCorrect: Boolean!
    score: Int
    createdAt: String
    updatedAt: String
  }

  input CreateTestResultInput {
    userId: ID!
    questionId: ID!
    floorId: ID
    answer: String!
    isCorrect: Boolean!
    score: Int
  }

  type Query {
    getTestResultsByUser(userId: ID!): [TestResult]
    getTestResultsByFloor(floorId: ID!): [TestResult]
  }

  type Mutation {
    createTestResult(input: CreateTestResultInput!): TestResult
  }
`;
