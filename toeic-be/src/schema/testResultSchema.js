const { gql } = require("apollo-server");

const testResultSchema = gql`
  type TestResult {
    id: ID!
    userId: ID!
    miniTestId: ID!
    score: Int!
    passed: Boolean!
    completedAt: String
  }

  type Query {
    getTestResult(id: ID!): TestResult
    getAllTestResults(userId: ID!): [TestResult]
  }

  type Mutation {
    createTestResult(
      userId: ID!
      miniTestId: ID!
      score: Int!
      passed: Boolean!
    ): TestResult

    updateTestResult(id: ID!, score: Int, passed: Boolean): TestResult

    deleteTestResult(id: ID!): Boolean
  }
`;

module.exports = testResultSchema;
