import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    sessionToken: {
      type: String,
      default: null,
      index: true,
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

export default userSchema;
