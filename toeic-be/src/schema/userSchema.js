const { gql } = require("apollo-server-express");

module.exports = gql`
  enum UserStatus {
    ACTIVE
    INACTIVE
    BLOCKED
    BANNED
  }

  type Role {
    id: ID!
    name: String!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    role: Role!
    fullName: String
    avatar: String
    birthDate: String
    phone: String
    status: UserStatus!
    emailVerified: Boolean!
    exp: Int!
    level: Int!
    coin: Int!
    createdAt: String
    updatedAt: String
  }
  type AuthPayload {
    token: String!
    user: User!
  }
  input CreateUserInput {
    username: String!
    password: String!
    email: String!
    fullName: String
    roleId: ID!
    avatar: String
    birthDate: String
    phone: String
  }

  input UpdateUserInput {
    username: String
    password: String
    email: String
    fullName: String
    avatar: String
    birthDate: String
    phone: String
    status: UserStatus
  }

  type Query {
    getUser(id: ID!): User
    getUsers(limit: Int, offset: Int): [User!]!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(id: ID!, input: UpdateUserInput!): User!
    deleteUser(id: ID!): Boolean!
    loginWithGoogle(idToken: String!): AuthPayload!
  }
`;
