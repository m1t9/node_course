import { Schema, model } from "mongoose";

export const userSchema = new Schema({
  userName: {
    type: String,
    validate: (raw: String) => {
      return raw.split(" ").length === 1;
    },
    required: [true, "User name is required"],
  },
  firstName: String,
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});

export const User = model("User", userSchema);
