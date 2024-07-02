import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import colors from "colors";

const MONGO_URI = process.env.mongoUri;

import userSchema from "../schemas/User.js";
import questionSchema from "../schemas/Question.js";
import chatSchema from "../schemas/Chat.js";
import { cleanUpGuestsQuetsions } from "../utils/cleanupGuestsQuestions.js";

let User, Question, Chat, QuestionGuest;

try {
  const connectionDB1 = mongoose.createConnection(MONGO_URI);
  connectionDB1.once("open", () => {
    console.log(
      colors.magenta.underline(`MongoDB connected: ${connectionDB1.name}`)
    );
    setInterval(cleanUpGuestsQuetsions, 12 * 60 * 60 * 1000);
  });
  User = connectionDB1.model("User", userSchema);
  Question = connectionDB1.model("Question", questionSchema);
  QuestionGuest = connectionDB1.model(
    "QuestionGuest",
    questionSchema,
    "questions_guest"
  );
  Chat = connectionDB1.model("Chat", chatSchema);
} catch (error) {
  console.log("Error: ", error);
  process.exit();
}

export { User, Question, Chat, QuestionGuest };
