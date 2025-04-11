const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar DateTime

  enum UserStatus {
    ACTIVE
    LOCKED
    DELETED
  }

  type User {
    id: ID!
    name: String!
    email: String!
    role: Role!
    avatar: String
    exp: Int!
    coin: Int!
    status: UserStatus!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Role {
    id: ID!
    name: String!
    users: [User]
  }

  input RegisterInput {
    name: String!
    email: String!
    password: String!
    roleId: ID!
  }

  input UpdateUserInput {
    name: String
    avatar: String
    roleId: ID
  }

  type AuthPayload {
    status: Boolean!
    msg: String
    token: String
    user: User
  }

  type MessageResponse {
    status: Boolean!
    msg: String
  }

  extend type Query {
    getUsers: [User!]!
    getUserById(id: ID!): User
    getUserRole(userId: ID!): Role
    getRoles: [Role!]!
    me: User
  }

  extend type Mutation {
    register(input: RegisterInput!): MessageResponse
    login(email: String!, password: String!): AuthPayload
    updateUser(id: ID!, input: UpdateUserInput!): User
    deleteUser(id: ID!): MessageResponse
    lockUser(id: ID!): MessageResponse
    unlockUser(id: ID!): MessageResponse
    updateUserRole(userId: ID!, roleId: ID!): MessageResponse
    updateAvatar(userId: ID!, base64Image: String!): User
  }
`;

module.exports = { typeDefs };
