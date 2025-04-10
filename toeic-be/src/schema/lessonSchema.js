const { gql } = require("apollo-server-express");

const lessonTypeDefs = gql`
  type Lesson {
    id: ID!
    title: String!
    description: String
    content: String!
    videoUrl: String
    order: Int!
    courseId: ID!
    course: Course
    questions: [Question]
    createdAt: String
    updatedAt: String
  }

  input CreateLessonInput {
    title: String!
    description: String
    content: String!
    videoUrl: String
    order: Int!
    courseId: ID!
  }

  input UpdateLessonInput {
    title: String
    description: String
    content: String
    videoUrl: String
    order: Int
  }

  type Query {
    getLessonsByCourse(courseId: ID!): [Lesson]
    getLessonById(id: ID!): Lesson
  }

  type Mutation {
    createLesson(input: CreateLessonInput!): Lesson
    updateLesson(id: ID!, input: UpdateLessonInput!): Lesson
    deleteLesson(id: ID!): Boolean
  }
`;

module.exports = { lessonTypeDefs };
