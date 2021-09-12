import { Schema, model } from "mongoose";

export const postSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Post title is required"],
      minlength: 5,
      maxlength: 100,
      unique: true,
    },
    content: {
      type: String,
      minlength: 50,
    },
    authorId: {
      type: String,
      required: [true, "Author ID is required"],
      minlength: 1,
    }
  },
  {
    timestamps: true,
  }
);

postSchema.static("getByUserName", async function (name: string) {
  return this.find({
    author: {
      userName: name,
    },
  });
});

export const Post = model('Post', postSchema);
