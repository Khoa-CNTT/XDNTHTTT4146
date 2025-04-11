const { gql } = require("apollo-server-express");

const questionSchema = gql`
  scalar JSON

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

  input CreateQuestionInput {
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

  type MockQuestionResponse {
    success: Boolean!
    message: String!
    question: MockQuestion
  }

  extend type Query {
    getMockQuestionsByTest(mock_test_id: ID!): [MockQuestion!]!
    getMockQuestionById(id: ID!): MockQuestion
  }

  extend type Mutation {
    createMockQuestion(input: CreateQuestionInput!): MockQuestionResponse!
    updateMockQuestion(
      id: ID!
      input: UpdateMockQuestionInput!
    ): MockQuestionResponse!
    deleteMockQuestion(id: ID!): Boolean!
  }
`;

module.exports = questionSchema;
