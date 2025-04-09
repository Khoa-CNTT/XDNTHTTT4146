const { gql } = require("apollo-server-express");

module.exports = gql`
  enum GameStatus {
    active
    completed
    paused
  }

  type Game {
    id: ID!
    userId: ID!
    user: User
    name: String!
    description: String
    score: Int
    status: GameStatus
    startDate: String
    endDate: String
    sessions: [GameSession]
  }

  input GameInput {
    userId: ID!
    name: String!
    description: String
    score: Int
    status: GameStatus
    startDate: String
    endDate: String
  }

  input GameUpdateInput {
    name: String
    description: String
    score: Int
    status: GameStatus
    startDate: String
    endDate: String
  }

  type GameResponse {
    success: Boolean!
    message: String!
    game: Game
  }

  type Query {
    games: [Game]
    game(id: ID!): Game
    gamesByUser(userId: ID!): [Game]
  }

  type Mutation {
    createGame(input: GameInput!): Game
    updateGame(id: ID!, input: GameUpdateInput!): Game
    deleteGame(id: ID!): GameResponse
  }
`;
