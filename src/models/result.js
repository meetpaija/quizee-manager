import mongoose from "mongoose";
import { timestamp } from "./plugins/timestamp.js";

let resultSchema = new mongoose.Schema({
  percentage: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Quiz",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

resultSchema.plugin(timestamp);

const Result = mongoose.model("Result", resultSchema);

export default Result;
