const { gql } = require("apollo-server-express");

module.exports = gql`
  type Answer {
    id: ID!
    label: String!
    answer: String!
    isCorrect: Boolean!
    explanation: String
    order: Int
    question: Question
  }

  # Queries cho Answer
  type Query {
    getAnswer(id: ID!): Answer
  }

  # Mutations cho Answer
  type Mutation {
    createAnswer(
      label: String!
      answer: String!
      questionId: ID!
      isCorrect: Boolean
      explanation: String
      order: Int
    ): Answer
  }
`;
