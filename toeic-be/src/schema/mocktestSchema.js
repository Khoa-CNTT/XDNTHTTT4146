const { gql } = require("apollo-server-express");

const mockTestTypeDefs = gql`
  enum DifficultyLevel {
    easy
    medium
    hard
  }

  type MockTest {
    id: ID!
    title: String!
    description: String
    total_questions: Int!
    duration: Int!
    difficulty: DifficultyLevel!
    tags: [String]
    is_active: Boolean!
    is_public: Boolean!
    created_by: ID
    createdAt: String!
    updatedAt: String!
  }

  input MockTestInput {
    title: String!
    description: String
    total_questions: Int!
    duration: Int!
    difficulty: DifficultyLevel
    tags: [String]
    is_active: Boolean
    is_public: Boolean
    created_by: ID
  }

  input MockTestFilterInput {
    difficulty: DifficultyLevel
    is_public: Boolean
    is_active: Boolean
    created_by: ID
    keyword: String
  }

  type MockTestResponse {
    status: Boolean!
    msg: String!
    mockTest: MockTest
  }

  extend type Query {
    getAllMockTests(filter: MockTestFilterInput): [MockTest!]!
    getMockTestById(id: ID!): MockTest
    getMockTestsByCreator(creatorId: ID!): [MockTest!]!
  }

  extend type Mutation {
    createMockTest(input: MockTestInput!): MockTestResponse!
    updateMockTest(id: ID!, input: MockTestInput!): MockTestResponse!
    deleteMockTest(id: ID!): MockTestResponse!
  }
`;

module.exports = { typeDefs: mockTestTypeDefs };
