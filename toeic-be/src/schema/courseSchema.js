const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Course {
    id: ID!
    title: String!
    description: String!
    createdAt: String
    updatedAt: String
  }

  type Query {
    courses: [Course!]!
    course(id: ID!): Course
  }

  type Mutation {
    createCourse(title: String!, description: String!): Course!
  }
`;

module.exports = { typeDefs };
