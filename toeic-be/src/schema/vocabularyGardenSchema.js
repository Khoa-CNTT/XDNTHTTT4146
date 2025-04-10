const { gql } = require("apollo-server-express");

const vocabularyGardenSchema = gql`
  type VocabularyGarden {
    id: ID!
    userId: ID!
    vocabularyId: ID!
    status: VocabularyStatus!
    createdAt: String!
    updatedAt: String!
  }

  enum VocabularyStatus {
    seed # Chưa học
    growing # Đang học
    bloomed # Đã học xong
    wilted # Bị quên (suy giảm trí nhớ)
  }

  input CreateVocabularyGardenInput {
    userId: ID!
    vocabularyId: ID!
    status: VocabularyStatus = seed
  }

  input UpdateVocabularyGardenInput {
    id: ID!
    status: VocabularyStatus!
  }

  type Query {
    getVocabularyGardenByUser(userId: ID!): [VocabularyGarden!]!
    getVocabularyGardenEntry(id: ID!): VocabularyGarden
  }

  type Mutation {
    createVocabularyGarden(
      input: CreateVocabularyGardenInput!
    ): VocabularyGarden
    updateVocabularyGarden(
      input: UpdateVocabularyGardenInput!
    ): VocabularyGarden
    deleteVocabularyGarden(id: ID!): Boolean
  }
`;

module.exports = vocabularyGardenSchema;
