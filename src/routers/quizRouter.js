import express from "express";
import User from "../models/user.js";
import { setErrorResponse, setSucessResponse } from "../helper/response.js";
import Question from "../models/question.js";
import { addQuestions } from "./questionRouter.js";
import Quiz from "../models/quiz.js";

const router = express.Router();

router.post(
  "/users/:id/quizees",
  async (req, res) => await createQuiz(req, res)
);

const createQuiz = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).setCustomErrorResponse("User not found");
    }

    const createdQuestions = await addQuestions(req.body.questions, user);

    const quiz = new Quiz({
      ...req.body,
      questions: createdQuestions.map((question) => question._id),
      user: userId,
    });

    await quiz.save();
    res.status(201).send(setSucessResponse(quiz));
  } catch (e) {
    res.status(500).send(setErrorResponse(e));
  }
};

export default router;
