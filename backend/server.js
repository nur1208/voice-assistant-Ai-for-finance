import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import newsRouter from "./routes/newsRoute.js";
import companyRouter from "./routes/companyRoute.js";
import unknownKeywordForCompanyRouter from "./routes/unknownKeywordForCompanyRoute.js";

dotenv.config();

const main = async () => {
  // MongoDB
  try {
    await mongoose
      // eslint-disable-next-line no-undef
      .connect(process.env.MONGODB_URL);

    console.log("Connected to DB");

    const app = express();
    const port = 4050;

    // TODO connect to that database then start the server.
    app.use(morgan("dev"));
    app.use(express.json()); // support json encoded bodies
    // app.use(express.urlencoded({ extended: true })); // support encoded bodies

    // Setting up middleware
    app.use(cors("http://localhost:3000"));
    // app.use(express.static("public"));
    // app.use(initialize());

    app.get("/", (req, res) => {
      res.send("working");
    });

    // app.get("/api/v1/news", (req, res) => {
    //   res.send("working");
    // });

    // Routing
    app.use("/api/v1/news", newsRouter);
    app.use("/api/v1/companies", companyRouter);
    app.use(
      "/api/v1/unknownKeywords",
      unknownKeywordForCompanyRouter
    );
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
