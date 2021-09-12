import * as express from "express";
import { User } from "./user";

export const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await User.find({});

    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  const id = req.params.id;

  try {
    const result = await User.findById(id);

    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  const postData = req.body;

  const post = new User(postData);

  try {
    const result = await post.save();

    res.json(result);
  } catch (err) {
    next(err);
  }
});
