import mongoose, { Schema, model } from "mongoose";
import Question from "./Question.js";
import User from "./User.js";

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
    //questions[0].score = 10
    //questions[0].score = 2
    //questions[0].score = ?
    //scoreAverage : 10+2+?/3
    scoreAverage: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Chat = model.Chat || model("Chat", chatSchema);
export default Chat;
