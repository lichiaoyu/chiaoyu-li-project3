import mongoose from "mongoose";
import userSchema from "../schema/user.schema.js";

const UserModel =
  mongoose.models.User || mongoose.model("User", userSchema);

export function createUser(user) {
  return UserModel.create(user);
}

export function findUserByUsername(username) {
  return UserModel.findOne({ username }).exec();
}

export default UserModel;