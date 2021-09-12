import * as express from "express";
import { json as jsonBodyParser } from "body-parser";
import { Error } from "mongoose";

import { router as postsRouter } from "./post.router";
import { router as usersRouter } from "./user.router";

export const app = express();
// middlewares
app.use(jsonBodyParser());

app.get("/", (req, res, next) => {
  res.send("Welcome to Posts api");
});

app.use("/posts", postsRouter);
app.use("/people", usersRouter);

// error handling
app.use((req, res) => {
  res.status(404).json("Not found");
});

app.use((err, req, res, next) => {
  console.error(err.stack);

  if (err instanceof Error.ValidationError) {
    return res.status(400).json(err);
  }

  res.status(500).json(err);
});
