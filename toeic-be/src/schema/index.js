const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    token: String
  }

  type Query {
    getCurrentUser: User
  }

  type Mutation {
    login(email: String!, password: String!): User
    register(username: String!, email: String!, password: String!): User
  }
`;

module.exports = { typeDefs };
