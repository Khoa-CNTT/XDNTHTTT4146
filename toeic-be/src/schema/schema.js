const { gql } = require("apollo-server-express");
const { mergeTypeDefs } = require("@graphql-tools/merge");

const userTypeDefs = require("./userSchema").typeDefs;
const lessonTypeDefs = require("./lessonSchema").typeDefs;
const courseTypeDefs = require("./courseSchema").typeDefs;
const gameTypeDefs = require("./gameSchema").typeDefs;
const badgeTypeDefs = require("./badgeSchema").typeDefs;
const leaderboardTypeDefs = require("./leaderboardSchema").typeDefs;
const missionTypeDefs = require("./MissionSchema").typeDefs;
const paymentTypeDefs = require("./paymentSchema").typeDefs;
const notificationTypeDefs = require("./notificationSchema").typeDefs;
const vocabularyGardenTypeDefs = require("./vocabularyGardenSchema").typeDefs;

const typeDefs = mergeTypeDefs([
  userTypeDefs,
  lessonTypeDefs,
  courseTypeDefs,
  gameTypeDefs,
  badgeTypeDefs,
  leaderboardTypeDefs,
  missionTypeDefs,
  paymentTypeDefs,
  notificationTypeDefs,
  vocabularyGardenTypeDefs,
]);

module.exports = { typeDefs };
