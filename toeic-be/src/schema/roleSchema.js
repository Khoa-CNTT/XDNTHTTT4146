const { gql } = require("apollo-server-express");

const roleSchema = gql`
  type Role {
    id: ID!
    name: String!
  }

  input CreateRoleInput {
    name: String!
  }

  input UpdateRoleInput {
    id: ID!
    name: String!
  }

  type RolePayload {
    message: String!
    role: Role
  }

  extend type Query {
    getAllRoles: [Role!]!
    getRoleById(id: ID!): Role
  }

  extend type Mutation {
    createRole(input: CreateRoleInput!): RolePayload!
    updateRole(input: UpdateRoleInput!): RolePayload!
    deleteRole(id: ID!): Boolean!

    assignRoleToUser(userId: ID!, roleId: ID!): Boolean!
    removeRoleFromUser(userId: ID!, roleId: ID!): Boolean!
  }
`;

module.exports = roleSchema;
