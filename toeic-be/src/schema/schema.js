const { mergeTypeDefs } = require("@graphql-tools/merge");

const { typeDefs: userTypeDefs } = require("./userSchema");
const { typeDefs: lessonTypeDefs } = require("./lessonSchema");
const { typeDefs: courseTypeDefs } = require("./courseSchema");
const { typeDefs: gameTypeDefs } = require("./gameSchema");
const { typeDefs: badgeTypeDefs } = require("./badgeSchema");
const { typeDefs: leaderboardTypeDefs } = require("./leaderboardSchema");
const { typeDefs: missionTypeDefs } = require("./MissionSchema");
const { typeDefs: paymentTypeDefs } = require("./paymentSchema");
const { typeDefs: notificationTypeDefs } = require("./notificationSchema");
const {
  typeDefs: vocabularyGardenTypeDefs,
} = require("./vocabularyGardenSchema");

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
