require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { createApolloServer } = require("./config/graphql");
const errorHandler = require("./middlewares/errorHandler");
const imageUploadRouter = require("./routes/imageUpload");
const app = express();

const corsOptions = {
  origin: ["http://localhost:4000"],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

app.use(express.json());
app.use("/api", imageUploadRouter);
const startServer = async () => {
  try {
    const { app, server } = await createApolloServer();

    app.use(errorHandler);

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(
        `Server is running at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  } catch (error) {
    console.error("Error initializing server:", error);
    process.exit(1);
  }
};

startServer();
