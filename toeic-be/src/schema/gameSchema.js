const { gql } = require("apollo-server-express");

const gameSchema = gql`
  scalar DateTime

  enum GameStatus {
    active
    completed
    paused
    failed
  }

  enum GameMode {
    solo
    timed
    challenge
    pvp
  }

  type Game {
    id: ID!
    userId: ID!
    name: String!
    description: String
    score: Int
    maxScore: Int
    status: GameStatus!
    startDate: DateTime
    endDate: DateTime
    duration: Int
    mode: GameMode!
    createdAt: DateTime
    updatedAt: DateTime
  }

  input CreateGameInput {
    userId: ID!
    name: String!
    description: String
    maxScore: Int
    mode: GameMode = solo
  }

  input UpdateGameInput {
    name: String
    description: String
    score: Int
    maxScore: Int
    status: GameStatus
    endDate: DateTime
    duration: Int
    mode: GameMode
  }

  type GameResponse {
    success: Boolean!
    message: String!
    game: Game
  }

  extend type Query {
    getAllGames: [Game!]!
    getGameById(id: ID!): Game
    getGamesByUser(userId: ID!): [Game!]!
  }

  extend type Mutation {
    createGame(input: CreateGameInput!): GameResponse!
    updateGame(id: ID!, input: UpdateGameInput!): GameResponse!
    deleteGame(id: ID!): GameResponse!
  }
`;

module.exports = { gameSchema };
