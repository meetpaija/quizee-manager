import mongoose from "mongoose";
import { timestamp } from "./plugins/timestamp.js";

const quizSchema = new mongoose.Schema({
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Question',
    },
  ],
  isActive: {
    type: Boolean,
    default: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

quizSchema.plugin(timestamp);

const Quiz = mongoose.model("Quiz", quizSchema);

export default Quiz;
