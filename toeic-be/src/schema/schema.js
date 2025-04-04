const { gql } = require("apollo-server-express");
const { mergeTypeDefs } = require("@graphql-tools/merge");

const userTypeDefs = require("./userSchema").typeDefs;
const lessonTypeDefs = require("./lessonSchema").typeDefs;
const courseTypeDefs = require("./courseSchema").typeDefs;

const typeDefs = mergeTypeDefs([userTypeDefs, lessonTypeDefs, courseTypeDefs]);

module.exports = { typeDefs };
