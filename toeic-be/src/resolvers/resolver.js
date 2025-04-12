const fs = require("fs");
const path = require("path");

const Query = {};
const Mutation = {};
const Subscription = {};
const typeResolvers = {};

fs.readdirSync(__dirname).forEach((file) => {
  if (file === "index.js" || !file.endsWith("Resolver.js")) return;

  const resolver = require(path.join(__dirname, file));

  if (resolver.Query) Object.assign(Query, resolver.Query);
  if (resolver.Mutation) Object.assign(Mutation, resolver.Mutation);
  if (resolver.Subscription) Object.assign(Subscription, resolver.Subscription);

  Object.keys(resolver).forEach((key) => {
    if (!["Query", "Mutation", "Subscription"].includes(key)) {
      if (!typeResolvers[key]) typeResolvers[key] = {};
      Object.assign(typeResolvers[key], resolver[key]);
    }
  });
});

module.exports = {
  Query,
  Mutation,
  Subscription,
  ...typeResolvers,
};
