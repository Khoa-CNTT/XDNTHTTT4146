const { gql } = require("apollo-server");

const miniTestSchema = gql`
  type MiniTest {
    id: ID!
    name: String!
    description: String
    timeLimit: Int!
    towerId: ID!
    passScore: Int!
  }

  type Query {
    getMiniTest(id: ID!): MiniTest
    getAllMiniTests(towerId: ID!): [MiniTest]
  }

  type Mutation {
    createMiniTest(
      name: String!
      description: String
      timeLimit: Int!
      towerId: ID!
      passScore: Int!
    ): MiniTest

    updateMiniTest(
      id: ID!
      name: String
      description: String
      timeLimit: Int
      passScore: Int
    ): MiniTest

    deleteMiniTest(id: ID!): Boolean
  }
`;

module.exports = miniTestSchema;
