const { gql } = require("apollo-server-express");

const mockResultTypeDefs = gql`
  enum MockResultStatus {
    completed
    in_progress
    expired
  }

  type SectionScore {
    part: String
    score: Int
  }

  type MockResult {
    id: ID!
    user_id: ID!
    mock_test_id: ID!
    score: Int!
    correct_count: Int!
    total_questions: Int!
    duration_taken: Int
    submitted_at: String!
    section_scores: [SectionScore]
    accuracy: Float
    status: MockResultStatus!
    createdAt: String!
    updatedAt: String!
  }

  input SectionScoreInput {
    part: String!
    score: Int!
  }

  input MockResultInput {
    user_id: ID!
    mock_test_id: ID!
    score: Int!
    correct_count: Int!
    total_questions: Int!
    duration_taken: Int
    submitted_at: String
    section_scores: [SectionScoreInput]
    accuracy: Float
    status: MockResultStatus
  }

  type MockResultResponse {
    status: Boolean!
    msg: String!
    mockResult: MockResult
  }

  type WeeklyMockStats {
    year: Int!
    week: Int!
    avgScore: Float!
    attempts: Int!
  }

  extend type Query {
    getMockResultsByUser(userId: ID!): [MockResult!]!
    getMockResultById(id: ID!): MockResult
    getWeeklyMockStatsByUser(userId: ID!): [WeeklyMockStats!]!
  }

  extend type Mutation {
    createMockResult(input: MockResultInput!): MockResultResponse!
    updateMockResult(id: ID!, input: MockResultInput!): MockResultResponse!
    deleteMockResult(id: ID!): MockResultResponse!
  }
`;

module.exports = { typeDefs: mockResultTypeDefs };
