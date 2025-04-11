const { mergeTypeDefs } = require("@graphql-tools/merge");

// Import các schema con
const { typeDefs: roleTypeDefs } = require("./roleSchema");
const { typeDefs: userTypeDefs } = require("./userSchema");
const { typeDefs: lessonTypeDefs } = require("./lessonSchema");
const { typeDefs: courseTypeDefs } = require("./courseSchema");
const { typeDefs: gameTypeDefs } = require("./gameSchema");
const { typeDefs: badgeTypeDefs } = require("./badgeSchema");
const { typeDefs: leaderboardTypeDefs } = require("./leaderboardSchema");
const { typeDefs: missionTypeDefs } = require("./missionSchema");
const { typeDefs: paymentTypeDefs } = require("./paymentSchema");
const {
  typeDefs: userNotificationTypeDefs,
} = require("./userNotificationSchema");
const {
  typeDefs: systemnotificationTypeDefs,
} = require("./systemNotificationSchema");
const {
  typeDefs: vocabularyGardenTypeDefs,
} = require("./vocabularyGardenSchema");
const {
  typeDefs: coinTransactionTypeDefs,
} = require("./coinTransactionSchema");

const { imageSchema } = require("./imageSchema");
const { itemSchema } = require("./itemSchema");
const { typeDefs: mockTestTypeDefs } = require("./mockTestSchema");

// Merge tất cả các schema lại
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
  coinTransactionTypeDefs,
  imageSchema,
  itemSchema,
  mockTestTypeDefs,
]);

module.exports = { typeDefs };
