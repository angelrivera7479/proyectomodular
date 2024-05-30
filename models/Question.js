import { Schema, model } from "mongoose";

const questionSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
      default: 50,
    },
  },
  {
    timestamps: true,
  }
);

const Question = model.Question || model("Question", questionSchema);
export default Question;
