import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const main = async () => {
  // MongoDB
  try {
    await mongoose
      // eslint-disable-next-line no-undef
      .connect(process.env.MONGODB_URL);

    console.log("Connected to DB");

    const app = express();
    const port = 3050;

    // TODO connect to that database then start the server.
    app.use(morgan("dev"));
    app.use(express.json()); // support json encoded bodies
    // app.use(express.urlencoded({ extended: true })); // support encoded bodies

    // Setting up middleware
    // app.use(cors("http://localhost:3000"));
    // app.use(express.static("public"));
    // app.use(initialize());

    // Routing
    // app.use("/api/v1/stocks", stockRouter);

    app.listen(port, () => {
      console.log(
        `express app listening at http://localhost:${port}`
      );
    });
  } catch (error) {
    console.log(error);
  }
};

main();
