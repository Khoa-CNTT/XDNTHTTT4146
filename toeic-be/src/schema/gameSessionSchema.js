const { gql } = require("apollo-server-express");

module.exports = gql`
  scalar JSON

  type GameSession {
    id: ID!
    gameId: ID!
    userId: ID!
    score: Int
    duration: Int
    completedAt: String
    metadata: JSON
    createdAt: String
    updatedAt: String
  }

  input GameSessionInput {
    gameId: ID!
    userId: ID!
    score: Int
    duration: Int
    metadata: JSON
  }

  type GameSessionResponse {
    success: Boolean!
    message: String!
    session: GameSession
  }

  extend type Query {
    getAllGameSessions: [GameSession!]!
    getGameSessionById(id: ID!): GameSession
    getGameSessionsByUser(userId: ID!): [GameSession]
    getGameSessionsByGame(gameId: ID!): [GameSession]
  }

  extend type Mutation {
    createGameSession(input: GameSessionInput!): GameSessionResponse!
    deleteGameSession(id: ID!): GameSessionResponse!
  }
`;
