const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Question {
    id: ID!
    question: String!
    answer: String!
    lessonId: ID!
    type: String!
    options: [String]
    explanation: String
    score: Int!
    timeLimit: Int!
    level: Int!
    status: String!
  }

  # Queries cho Question
  type Query {
    getAllQuestions(lessonId: ID!): [Question]
    getQuestion(id: ID!): Question
  }

  # Mutations cho Question
  type Mutation {
    createQuestion(
      question: String!
      answer: String!
      lessonId: ID!
      type: String!
      options: [String]
      explanation: String
      score: Int!
      timeLimit: Int!
      level: Int!
    ): Question
    updateQuestion(
      id: ID!
      question: String!
      answer: String!
      type: String!
      options: [String]
      explanation: String
      score: Int!
      timeLimit: Int!
      level: Int!
    ): Question
    deleteQuestion(id: ID!): Boolean
  }
`;
module.exports = { typeDefs };
