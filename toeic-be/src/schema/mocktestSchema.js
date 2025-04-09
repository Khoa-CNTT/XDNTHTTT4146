const { gql } = require("apollo-server-express");

const mocktestSchema = gql`
  type MockTest {
    id: ID!
    title: String!
    description: String
    total_questions: Int!
    duration: Int!
    difficulty: String!
    is_active: Boolean!
    created_by: ID
    creator: User
    questions: [MockQuestion!]
    results: [MockResult!]
    createdAt: String!
    updatedAt: String!
    deletedAt: String
  }

  input CreateMockTestInput {
    title: String!
    description: String
    total_questions: Int!
    duration: Int!
    difficulty: String!
    created_by: ID
  }

  input UpdateMockTestInput {
    title: String
    description: String
    total_questions: Int
    duration: Int
    difficulty: String
    is_active: Boolean
  }

  type MockTestListPayload {
    tests: [MockTest!]!
    total: Int!
  }

  extend type Query {
    getMockTests(activeOnly: Boolean): [MockTest!]!
    getMockTestById(id: ID!): MockTest
    getMockTestsPaginated(page: Int!, limit: Int!): MockTestListPayload!
  }

  extend type Mutation {
    createMockTest(input: CreateMockTestInput!): MockTest!
    updateMockTest(id: ID!, input: UpdateMockTestInput!): MockTest!
    deleteMockTest(id: ID!): Boolean!
  }
`;

module.exports = mocktestSchema;
