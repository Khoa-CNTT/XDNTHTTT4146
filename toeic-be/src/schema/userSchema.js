const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: String!
    name: String!
    email: String!
    role: Role!
    avatar: String
    exp: Int!
    coin: Int!
    status: String!
    createdAt: String!
    updatedAt: String!
  }

  type Role {
    id: String!
    name: String!
    users: [User]
  }

  type Query {
    getUsers: [User]
    getUserById(id: String!): User
    getUserRole(userId: String!): Role
    getRoles: [Role]
  }

  input RegisterInput {
    name: String!
    email: String!
    password: String!
    roleId: String!
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

  type Mutation {
    register(input: RegisterInput!): MessageResponse
    login(email: String!, password: String!): AuthPayload
    updateUser(id: String!, name: String, avatar: String): User
    deleteUser(id: String!): MessageResponse
    lockUser(id: String!): MessageResponse
    unlockUser(id: String!): MessageResponse
  }
`;

module.exports = { typeDefs };
