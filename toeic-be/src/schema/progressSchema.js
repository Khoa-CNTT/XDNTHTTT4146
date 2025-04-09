const { gql } = require("apollo-server-express");

const progressSchema = gql`
  type Progress {
    id: ID!
    user: User!
    lesson: Lesson!
    status: String!
    score: Int
    expGained: Int!
    createdAt: String!
    updatedAt: String!
  }

  input UpdateProgressInput {
    lessonId: ID!
    status: String
    score: Int
    expGained: Int
  }

  extend type Query {
    getProgressByUser(userId: ID!): [Progress!]!
    getProgressByUserAndLesson(userId: ID!, lessonId: ID!): Progress
  }

  extend type Mutation {
    updateProgress(input: UpdateProgressInput!): Progress!
    resetProgress(userId: ID!, lessonId: ID!): Boolean!
  }
`;

module.exports = progressSchema;
