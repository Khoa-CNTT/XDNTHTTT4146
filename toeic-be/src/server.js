require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { createApolloServer } = require("./config/graphql");

const app = express();
app.use(cors());
app.use(express.json());

// Khởi tạo Apollo Server
const startServer = async () => {
  const apolloServer = createApolloServer();
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(
      `Server is running at http://localhost:${PORT}${apolloServer.graphqlPath}`
    );
  });
};

startServer();
