import express from "express";
import User from "../models/user.js";
import {
  setErrorResponse,
  setSucessResponse,
  setCustomErrorResponse,
} from "../helper/response.js";
import Question from "../models/question.js";

const router = express.Router();

router.post("/users/:id/questions", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send(setCustomErrorResponse("User not found"));
    }
    const question = await addQuestion(req.body.question, user);
    res.status(201).send(question);
  } catch (error) {
    res.status(500).send(setErrorResponse(error));
  }
});

const addQuestion = async (question, user) => {
  try {
      
    const questionModel = new Question({
      ...question,
      user: user._id,
    });
    await questionModel.save();
    return questionModel;
  } catch (error) {
    throw new Error(error);
  }
};

export const addQuestions = async (questions = [], user) => {
  try {
    const queArray = questions.map(async (question) => {
      const questionModel = await addQuestion(question, user);
      return questionModel;
    });

    const createdQuestions = await Promise.all(queArray);
    return createdQuestions;
  } catch (error) {
    throw new Error(error);
  }
};

export default router;
