const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar DateTime

  enum Difficulty {
    easy
    medium
    hard
  }

  enum PartOfSpeech {
    noun
    verb
    adj
    adv
    prep
    conj
    other
  }

  enum Level {
    A1
    A2
    B1
    B2
    C1
    C2
  }

  type Vocabulary {
    id: ID!
    word: String!
    meaning: String!
    pronunciation: String
    ipa: String
    audioUrl: String
    partOfSpeech: PartOfSpeech
    difficulty: Difficulty
    example: String
    synonyms: [String]
    antonyms: [String]
    imageUrl: String
    category: String
    source: String
    tags: [String]
    level: Level
    isCommon: Boolean
    reviewedCount: Int
    lastReviewedAt: DateTime
  }

  input VocabularyInput {
    word: String!
    meaning: String!
    pronunciation: String
    ipa: String
    audioUrl: String
    partOfSpeech: PartOfSpeech
    difficulty: Difficulty
    example: String
    synonyms: [String]
    antonyms: [String]
    imageUrl: String
    category: String
    source: String
    tags: [String]
    level: Level
    isCommon: Boolean
  }

  type Query {
    getVocabulary(id: ID!): Vocabulary
    getAllVocabularies: [Vocabulary]
  }

  type Mutation {
    createVocabulary(input: VocabularyInput): Vocabulary
    updateVocabulary(id: ID!, input: VocabularyInput): Vocabulary
    deleteVocabulary(id: ID!): Boolean
  }
`;

module.exports = { typeDefs };
