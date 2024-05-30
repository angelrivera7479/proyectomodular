import mongoose, { Schema, model } from "mongoose";

const schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: {
      type: [],
      required: true,
      default: ["user"],
    },
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = model.User || model("User", schema);
export default User;
