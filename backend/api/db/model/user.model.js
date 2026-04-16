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

export function findUserBySessionToken(sessionToken) {
  return UserModel.findOne({ sessionToken }).exec();
}

export function updateUserSessionToken(userId, sessionToken) {
  return UserModel.findByIdAndUpdate(userId, { sessionToken }, { new: true }).exec();
}

export function clearSessionToken(sessionToken) {
  return UserModel.updateOne({ sessionToken }, { $set: { sessionToken: null } }).exec();
}

export default UserModel;
