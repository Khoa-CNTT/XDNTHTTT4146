const userResolver = require("./userResolver");

const resolvers = {
  Query: {
    ...userResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
  },
};

module.exports = resolvers;
