const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Lesson {
    id: ID!
    title: String!
    content: String!
    createdAt: String
    updatedAt: String
  }

  type Query {
    lessons: [Lesson!]!
    lesson(id: ID!): Lesson
  }

  type Mutation {
    createLesson(title: String!, content: String!): Lesson!
  }
`;

module.exports = { typeDefs };
