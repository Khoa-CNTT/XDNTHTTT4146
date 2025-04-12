const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Role {
    id: ID!
    name: String!
    description: String
    permissions: JSON
  }

  input CreateRoleInput {
    name: String!
    description: String
    permissions: JSON
  }

  input UpdateRoleInput {
    id: ID!
    name: String
    description: String
    permissions: JSON
  }

  type Query {
    getAllRoles: [Role]
    getRoleById(id: ID!): Role
  }

  type Mutation {
    createRole(input: CreateRoleInput!): Role
    updateRole(input: UpdateRoleInput!): Role
    deleteRole(id: ID!): Boolean
  }
`;

module.exports = { typeDefs };
