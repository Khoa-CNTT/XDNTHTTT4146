const { gql } = require("apollo-server-express");

const roleSchema = gql`
  type Role {
    id: ID!
    name: String!
    createdAt: String
    updatedAt: String
  }

  input CreateRoleInput {
    name: String!
  }

  input UpdateRoleInput {
    name: String!
  }

  type RolePayload {
    success: Boolean!
    message: String!
    role: Role
  }

  extend type Query {
    getAllRoles: [Role!]!
    getRoleById(id: ID!): Role
  }

  extend type Mutation {
    createRole(input: CreateRoleInput!): RolePayload!
    updateRole(id: ID!, input: UpdateRoleInput!): RolePayload!
    deleteRole(id: ID!): RolePayload!

    assignRoleToUser(userId: ID!, roleId: ID!): RolePayload!
    removeRoleFromUser(userId: ID!, roleId: ID!): RolePayload!
  }
`;

module.exports = roleSchema;
