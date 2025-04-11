const { gql } = require("apollo-server-express");

const userProgressSchema = gql`
  type LessonProgress {
    lessonId: ID!
    completed: Boolean!
    score: Int
    lastAttemptedAt: String
  }

  type CourseProgress {
    courseId: ID!
    lessons: [LessonProgress!]!
    completed: Boolean!
    startedAt: String
    updatedAt: String
  }

  type UserProgress {
    id: ID!
    userId: ID!
    courses: [CourseProgress!]!
    totalCompletedLessons: Int
    totalCoursesEnrolled: Int
    updatedAt: String
  }

  input LessonProgressInput {
    lessonId: ID!
    completed: Boolean!
    score: Int
  }

  input UpdateCourseProgressInput {
    courseId: ID!
    lesson: LessonProgressInput!
  }

  type UserProgressPayload {
    message: String!
    progress: UserProgress
  }

  extend type Query {
    getUserProgress(userId: ID!): UserProgress
  }

  extend type Mutation {
    updateLessonProgress(
      input: UpdateCourseProgressInput!
    ): UserProgressPayload!
    resetUserProgress(userId: ID!): UserProgressPayload!
  }
`;

module.exports = userProgressSchema;
