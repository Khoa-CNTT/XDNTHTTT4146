const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Lesson {
    id: ID!
    name: String!
    description: String
    courseId: ID!
  }

  # Queries cho Lesson
  type Query {
    getAllLessons(courseId: ID!): [Lesson]
    getLesson(id: ID!): Lesson
  }

  # Mutations cho Lesson
  type Mutation {
    createLesson(name: String!, description: String, courseId: ID!): Lesson
    updateLesson(id: ID!, name: String!, description: String): Lesson
    deleteLesson(id: ID!): Boolean
  }
`;
module.exports = { typeDefs };
