const userResolver = require("./userResolver");
const courseResolver = require("./courseResolver");
const lessonResolver = require("./lessonResolver");
const questionResolver = require("./questionResolver");
const answerResolver = require("./answerResolver");
const examResolver = require("./examResolver");
const resultResolver = require("./resultResolver");
const itemResolver = require("./itemResolver");

const resolvers = {
  Query: {
    ...userResolver.Query,
    ...courseResolver.Query,
    ...lessonResolver.Query,
    ...testResolver.Query,
    ...questionResolver.Query,
    ...answerResolver.Query,
    ...examResolver.Query,
    ...resultResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
    ...courseResolver.Mutation,
    ...lessonResolver.Mutation,
    ...questionResolver.Mutation,
    ...answerResolver.Mutation,
    ...examResolver.Mutation,
  },
};

module.exports = resolvers;
