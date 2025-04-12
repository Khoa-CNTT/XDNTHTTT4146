const { ApolloServer } = require("apollo-server-express");
const jwt = require("jsonwebtoken");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || "";
    try {
      const user = jwt.verify(
        token.replace("Bearer ", ""),
        process.env.JWT_SECRET
      );
      return { user };
    } catch {
      return {};
    }
  },
});
