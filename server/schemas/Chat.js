import mongoose, { Schema } from "mongoose";
import { Question } from "../config/db.js";

const chatSchema = new Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    questions: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: "Question",
      required: true,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default chatSchema;
