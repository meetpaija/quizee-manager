import express from "express";
import User from "../models/user.js";
import {
  USER_NOT_FOUND,
  INPUT_INVALID,
} from "../helper/constants.js";
import {
  setErrorResponse,
  setSucessResponse,
  setCustomErrorResponse,
} from "../helper/response.js";

const router = express.Router();


router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(setSucessResponse(users));
  } catch (e) {
    res.status(500).send(setErrorResponse(e));
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send(setCustomErrorResponse(USER_NOT_FOUND));
    }
    res.status(200).send(setSucessResponse(user));
  } catch (e) {
    res.status(500).send(setErrorResponse(e));
  }
});

router.put("/users/:id", async (req, res) => {
  const updateInputKeys = Object.keys(req.body);
  const validUpdateKeys = ["username", "email", "password"];
  const isValidToUpdate = updateInputKeys.every((key) =>
    validUpdateKeys.includes(key)
  );

  if (!isValidToUpdate) {
    return res.status(400).send(setCustomErrorResponse(INPUT_INVALID));
  }

  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).send(setCustomErrorResponse(USER_NOT_FOUND));
    }

    updateInputKeys.forEach((update) => {
      user[update] = req.body[update];
    });

    await user.save();

    res.status(200).send(setSucessResponse(user));
  } catch (e) {
    res.status(500).send(setErrorResponse(e));
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send(setCustomErrorResponse(USER_NOT_FOUND));
    }
    res.status(200).send(setSucessResponse(user));
  } catch (e) {
    res.status(500).send(setErrorResponse(e));
  }
});

export default router;
