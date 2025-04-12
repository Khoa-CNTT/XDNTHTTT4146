const { gql } = require("apollo-server-express");

const lessonSchema = gql`
  scalar DateTime

  enum LessonType {
    reading
    listening
    video
    quiz
    grammar
  }

  type Lesson {
    id: ID!
    title: String!
    description: String
    content: String!
    videoUrl: String
    order: Int!
    type: LessonType!
    isPreviewable: Boolean!
    courseId: ID!
    createdAt: DateTime!
    updatedAt: DateTime
  }

  input CreateLessonInput {
    title: String!
    description: String
    content: String!
    videoUrl: String
    order: Int!
    type: LessonType
    isPreviewable: Boolean
    courseId: ID!
  }

  input UpdateLessonInput {
    title: String
    description: String
    content: String
    videoUrl: String
    order: Int
    type: LessonType
    isPreviewable: Boolean
  }

  type LessonResponse {
    success: Boolean!
    message: String!
    lesson: Lesson
  }

  extend type Query {
    getLessonById(id: ID!): Lesson
    getLessonsByCourse(courseId: ID!): [Lesson!]!
    getLessonsByType(type: LessonType!): [Lesson!]!
  }

  extend type Mutation {
    createLesson(input: CreateLessonInput!): LessonResponse!
    updateLesson(id: ID!, input: UpdateLessonInput!): LessonResponse!
    deleteLesson(id: ID!): LessonResponse!
  }
`;

module.exports = { lessonSchema };
