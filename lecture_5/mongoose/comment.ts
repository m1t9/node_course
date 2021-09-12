import { Schema, model } from "mongoose";

export const commentSchema = new Schema(
  {
    body: {
      type: String,
      required: [true, "Comment is required"],
      minlength: 5,
      maxlength: 1000,
      unique: false,
    },
    author: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
  }
);

commentSchema.static("getByUserName", async function (name: string) {
  return this.find({
    author: {
      userName: name,
    },
  });
});

export const Comment = model("Comment", commentSchema);
