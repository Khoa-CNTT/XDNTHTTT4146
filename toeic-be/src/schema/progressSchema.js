const { gql } = require("apollo-server-express");

const progressSchema = gql`
  type Progress {
    id: ID!
    userId: ID!
    lessonId: ID!
    status: String!
    score: Int
    accuracy: Float
    expGained: Int
    completedAt: String
    createdAt: String!
    updatedAt: String!
    user: User
    lesson: Lesson
  }

  input CreateProgressInput {
    userId: ID!
    lessonId: ID!
    status: String
    score: Int
    accuracy: Float
    expGained: Int
    completedAt: String
  }

  input UpdateProgressInput {
    status: String
    score: Int
    accuracy: Float
    expGained: Int
    completedAt: String
  }

  type ProgressResponse {
    success: Boolean!
    message: String!
    progress: Progress
  }

  extend type Query {
    getProgressByUser(userId: ID!): [Progress!]!
    getProgressByLesson(lessonId: ID!): [Progress!]!
    getProgress(userId: ID!, lessonId: ID!): Progress
  }

  extend type Mutation {
    createProgress(input: CreateProgressInput!): ProgressResponse!
    updateProgress(
      userId: ID!
      lessonId: ID!
      input: UpdateProgressInput!
    ): ProgressResponse!
    deleteProgress(userId: ID!, lessonId: ID!): Boolean!
  }
`;

module.exports = progressSchema;
