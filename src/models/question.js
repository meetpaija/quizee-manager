import mongoose from "mongoose";
import { timestamp } from "./plugins/timestamp.js";

let questionSchema = new mongoose.Schema({
  question: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  choices: [
    {
      choiceNo: {
        type: String,
        required: true,
        unique:true
      },
      choiceName: {
        type: String,
        required: true,
        trim: true,
      },
      type:Object,
      unique:true
    },
  ],
  answer: {
    type: String,
    required: true,
    validate(value) {
      if (!this.choices.some((choice) => choice.choiceNo === value)) {
        throw new mongoose.Error("Answer should be valid choiceNo");
      }
    },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

questionSchema.plugin(timestamp);

const Question = mongoose.model("Question", questionSchema);

export default Question;
