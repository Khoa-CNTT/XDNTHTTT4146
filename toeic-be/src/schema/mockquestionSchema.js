const { gql } = require("apollo-server-express");
const { gql } = require("apollo-server-express");

const mockQuestionSchema = gql`
  type MockQuestion {
    id: ID!
    mock_test_id: ID!
    mockTest: MockTest!
    question_text: String!
    options: JSON!
    correct_answer: String!
    explanation: String
    part: Int!
    audio_url: String
    image_url: String
    createdAt: String!
    updatedAt: String!
  }

  input CreateMockQuestionInput {
    mock_test_id: ID!
    question_text: String!
    options: JSON!
    correct_answer: String!
    explanation: String
    part: Int!
    audio_url: String
    image_url: String
  }

  input UpdateMockQuestionInput {
    question_text: String
    options: JSON
    correct_answer: String
    explanation: String
    part: Int
    audio_url: String
    image_url: String
  }

  extend type Query {
    getMockQuestionsByTest(mock_test_id: ID!): [MockQuestion!]!
    getMockQuestionById(id: ID!): MockQuestion
  }

  extend type Mutation {
    createMockQuestion(input: CreateMockQuestionInput!): MockQuestion!
    updateMockQuestion(id: ID!, input: UpdateMockQuestionInput!): MockQuestion!
    deleteMockQuestion(id: ID!): Boolean!
  }
`;

module.exports = mockQuestionSchema;
