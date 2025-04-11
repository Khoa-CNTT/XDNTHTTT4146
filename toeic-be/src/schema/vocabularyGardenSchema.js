const { gql } = require("apollo-server-express");

const vocabularyGardenSchema = gql`
  scalar DateTime

  enum VocabularyStatus {
    SEED # Chưa học
    GROWING # Đang học
    BLOOMED # Đã học xong
    WILTED # Bị quên (suy giảm trí nhớ)
  }

  type VocabularyGarden {
    id: ID!
    userId: ID!
    vocabularyId: ID!
    status: VocabularyStatus!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  input CreateVocabularyGardenInput {
    userId: ID!
    vocabularyId: ID!
    status: VocabularyStatus = SEED
  }

  input UpdateVocabularyGardenInput {
    id: ID!
    status: VocabularyStatus!
  }

  extend type Query {
    getVocabularyGardenByUser(userId: ID!): [VocabularyGarden!]!
    getVocabularyGardenEntry(id: ID!): VocabularyGarden
  }

  extend type Mutation {
    createVocabularyGarden(
      input: CreateVocabularyGardenInput!
    ): VocabularyGarden
    updateVocabularyGarden(
      input: UpdateVocabularyGardenInput!
    ): VocabularyGarden
    deleteVocabularyGarden(id: ID!): Boolean!
  }
`;

module.exports = vocabularyGardenSchema;
