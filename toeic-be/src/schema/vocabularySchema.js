const { gql } = require("apollo-server-express");

module.exports = gql`
  enum PartOfSpeech {
    noun
    verb
    adj
    adv
    prep
    conj
    other
  }

  enum VocabularyDifficulty {
    easy
    medium
    hard
  }

  enum VocabularyLevel {
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
    difficulty: VocabularyDifficulty
    level: VocabularyLevel
    synonyms: [String]
    antonyms: [String]
    example: String
    createdAt: String
    updatedAt: String
  }

  input CreateVocabularyInput {
    word: String!
    meaning: String!
    pronunciation: String
    ipa: String
    audioUrl: String
    partOfSpeech: PartOfSpeech
    difficulty: VocabularyDifficulty
    level: VocabularyLevel
    synonyms: [String]
    antonyms: [String]
    example: String
  }

  input UpdateVocabularyInput {
    word: String
    meaning: String
    pronunciation: String
    ipa: String
    audioUrl: String
    partOfSpeech: PartOfSpeech
    difficulty: VocabularyDifficulty
    level: VocabularyLevel
    synonyms: [String]
    antonyms: [String]
    example: String
  }

  type VocabularyMutationResponse {
    success: Boolean!
    message: String!
    vocabulary: Vocabulary
  }

  type Query {
    getAllVocabulary(limit: Int, offset: Int): [Vocabulary]
    getVocabularyById(id: ID!): Vocabulary
    searchVocabulary(keyword: String!): [Vocabulary]
    getVocabularyByLevel(level: VocabularyLevel!): [Vocabulary]
  }

  type Mutation {
    createVocabulary(input: CreateVocabularyInput!): VocabularyMutationResponse
    updateVocabulary(
      id: ID!
      input: UpdateVocabularyInput!
    ): VocabularyMutationResponse
    deleteVocabulary(id: ID!): VocabularyMutationResponse
  }
`;
