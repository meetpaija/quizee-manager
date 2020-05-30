import express from "express";
import User from "../models/user.js";
import { setErrorResponse, setSucessResponse } from "../helper/response.js";
import Quiz from "../models/quiz.js";
import Result from "../models/result.js";

const router = express.Router();

router.post(
  "/users/:userId/quizees/:quizId/results",
  async (req, res) => await insertResult(req, res)
);

router.get(
  "/users/:userId/results",
  async (req, res) => await fetchQuizeesResult(req, res)
);


const fetchQuizeesResult = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).setCustomErrorResponse("User not found");
    }

    await user.populate("results").execPopulate()

    res.status(200).send(setSucessResponse(user));
  } catch (error) {
    throw new Error(error);
  }
};

const insertResult = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).setCustomErrorResponse("User not found");
    }

    const quiz = await Quiz.findById(req.params.quizId);

    if (!quiz) {
      return res.status(404).setCustomErrorResponse("Quiz not found");
    }

    const result = new Result({
        ...req.body,
        user : user._id,
        quiz : quiz._id
    })

    await result.save();
    res.status(201).send(setSucessResponse(result));
  } catch (e) {
    res.status(500).send(setErrorResponse(e));
  }
};

export default router;
