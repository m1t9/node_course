import * as express from "express";
import * as faker from "faker";

import { Post } from "./post";
import { User } from "./user";

export const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await Post.find({});

    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  
  try {
    const result = await Post.findById(id);

    res.json(result);
  } catch (err) {
    next(err);
  }
});


router.post("/", async (req, res, next) => {
  const postData = req.body;

  try {
    const user = await User.findById(postData.authorId);
    const post = new Post(postData);

    const result = await post.save();
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.post("/random", async (req, res, next) => {
  const postData = {
    title: faker.lorem.sentence(3),
    content: faker.lorem.paragraphs(2),
    author: {
      userName: faker.internet.userName(),
      firstName: faker.name.firstName(),
    },
  };

  const post = new Post(postData);

  try {
    const result = await post.save();

    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.delete("/all", async (req, res, next) => {
  try {
    const result = await Post.deleteMany({});

    res.json(result);
  } catch (err) {
    next(err);
  }
});
