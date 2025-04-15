const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Answer {
    id: ID!
    label: String!
    answer: String!
    isCorrect: Boolean!
    explanation: String
    order: Int
    question: Question
  }

  type Query {
    getAnswer(id: ID!): Answer
  }

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

module.exports = { typeDefs };
