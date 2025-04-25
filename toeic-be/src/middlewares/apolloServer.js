const { verifyToken } = require("./utils/jwt");
const { User, Role } = require("./models");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers.authorization || "";
    if (!token) return {};

    try {
      const decoded = verifyToken(token);
      const user = await User.findByPk(decoded.id, {
        include: [{ model: Role, as: "role" }],
      });

      if (!user) return {};

      return {
        user: {
          id: user.id,
          email: user.email,
          role: user.role.name,
        },
      };
    } catch (err) {
      return {};
    }
  },
});
