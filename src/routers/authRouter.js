import express from "express";
import User from "../models/user.js";
import {
  setErrorResponse,
  setSucessResponse,
  setCustomErrorResponse,
  setAccessTokenResponse
} from "../helper/response.js";
import auth from "../middleware/auth.js";
import Token from "../models/token.js";
import { UNAME_EMAIL_EXIST } from "../helper/constants.js";


const authRouter = express.Router();

authRouter.post("/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.emailOrUsername,
      req.body.password
    );

    if (!user) {
      return res.status(404).send(setCustomErrorResponse("Check your credentials.."));
    }

    const token = await user.generateAuthToken();
    
    res.status(200).send(setAccessTokenResponse(user, token));
    
  } catch (e) {
    res.status(500).send(e);
  }
});

authRouter.post("/signup", async (req, res) => {
  try {
    
    const user = new User(req.body);

    const isUserExist = await User.isUserExist(req.body.email, req.body.password)
    
    if (isUserExist) {
      return res.status(500).send(setCustomErrorResponse(UNAME_EMAIL_EXIST));
    }
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send(setAccessTokenResponse(user, token));
  } catch (e) {
    res.status(500).send(setErrorResponse(e));
  }
});

authRouter.post("/logout", auth, async (req, res) => {
  try {

    const token = await Token.findByIdAndDelete(req.token._id)

    if (!token) {
      res.status(404).send(setCustomErrorResponse("Token not found"));
    }
    
    res.status(200).send(setSucessResponse());
  } catch (e) {
    res.status(500).send(e);
  }
});

export default authRouter;
