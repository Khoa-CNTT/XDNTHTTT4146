const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar DateTime
  scalar JSON

  enum UserStatus {
    ACTIVE
    LOCKED
    DELETED
    PENDING
  }
  enum Gender {
    MALE
    FEMALE
    OTHER
  }

  type Role {
    id: ID!
    name: String!
  }
  type User {
    id: ID!
    username: String!
    email: String!
    fullName: String
    avatar: String
    gender: String
    dob: String
    status: UserStatus
    role: Role
    lastLogin: DateTime
    exp: Int
    level: Int
    metadata: JSON
  }

  input UserInput {
    fullName: String
    avatarBase64: String
    gender: String
    dob: String
    status: UserStatus
  }

  input UpdateRoleInput {
    userId: ID!
    newRoleId: ID!
  }

  input UpdateStatusInput {
    userId: ID!
    newStatus: UserStatus!
  }

  input RegisterInput {
    username: String!
    email: String!
    password: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type MessageResponse {
    success: Boolean!
    message: String!
  }

  type Mutation {
    updateUser(userId: ID!, data: UserInput): User
    updateUserAvatar(userId: ID!, base64Image: String): User
    deleteUser(userId: ID!): Boolean
    updateUserRole(data: UpdateRoleInput): User
    updateUserStatus(data: UpdateStatusInput): User
    register(input: RegisterInput!): MessageResponse
    login(email: String!, password: String!): AuthPayload
    lockUser(id: ID!): MessageResponse
    unlockUser(id: ID!): MessageResponse
  }

  type Query {
    getUser(userId: ID!): User
  }
`;

module.exports = { typeDefs };
