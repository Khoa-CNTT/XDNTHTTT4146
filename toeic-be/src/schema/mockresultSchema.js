const { gql } = require("apollo-server-express");

const mockResultSchema = gql`
  scalar DateTime

  type MockResult {
    id: ID!
    userId: ID!
    mockTestId: ID!
    score: Int!
    correctCount: Int!
    totalQuestions: Int!
    durationTaken: Int
    submittedAt: DateTime!
    sectionScores: JSON
    accuracy: Float
    status: String!
    createdAt: DateTime!
    updatedAt: DateTime
  }

  input CreateMockResultInput {
    userId: ID!
    mockTestId: ID!
    score: Int!
    correctCount: Int!
    totalQuestions: Int!
    durationTaken: Int
    sectionScores: JSON
    status: String!
  }

  input UpdateMockResultInput {
    score: Int
    correctCount: Int
    totalQuestions: Int
    durationTaken: Int
    sectionScores: JSON
    status: String
  }

  extend type Query {
    getMockResultById(id: ID!): MockResult
    getAllMockResults: [MockResult!]!
    getMockResultsByUser(userId: ID!): [MockResult!]!
  }

  extend type Mutation {
    createMockResult(input: CreateMockResultInput!): MockResult!
    updateMockResult(id: ID!, input: UpdateMockResultInput!): MockResult!
    deleteMockResult(id: ID!): Boolean!
  }
`;

module.exports = { mockResultSchema };
