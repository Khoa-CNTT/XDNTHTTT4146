const { gql } = require("apollo-server-express");

const mockResultSchema = gql`
  type MockResult {
    id: ID!
    user: User!
    mockTest: MockTest!
    score: Int!
    correct_count: Int!
    total_questions: Int!
    submitted_at: String!
    duration_taken: Int
    createdAt: String!
    updatedAt: String!
  }

  input SubmitMockResultInput {
    mock_test_id: ID!
    score: Int!
    correct_count: Int!
    total_questions: Int!
    duration_taken: Int
  }

  type SubmitMockResultPayload {
    message: String!
    result: MockResult!
  }

  extend type Query {
    getMockResultsByUser(userId: ID!): [MockResult!]!
    getMockResultById(id: ID!): MockResult
  }

  extend type Mutation {
    submitMockResult(input: SubmitMockResultInput!): SubmitMockResultPayload!
    deleteMockResult(id: ID!): Boolean!
  }
`;

module.exports = mockResultSchema;
