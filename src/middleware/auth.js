import jsonwebtoken from "jsonwebtoken";
import User from "../models/user.js";
import Token from "../models/token.js";
import { setCustomErrorResponse } from "../helper/response.js";

const auth = async (req, res, next) => {
  try {

    const bearerToken = req.header("Authorization");
    
    if (!bearerToken) {
      return res.status(401).send(setCustomErrorResponse("Please authenticate!!"));
    }

    const accessToken = bearerToken.replace("Bearer ", "");

    const decoded = jsonwebtoken.verify(accessToken, "Don'tShareThis");

    if (!decoded) {
      return res.status(404).send(setCustomErrorResponse("Please authenticate!!"));
    }

    const user = await User.findById(decoded._id);

    if (!user) {
      return res.status(404).send(setCustomErrorResponse("Please authenticate!!"));
    }

    const token = await Token.findOne({ token: accessToken, user: user._id });

    if (!token) {
      return res.status(404).send(setCustomErrorResponse("Please authenticate!!"));
    }

    req.user = user;
    req.token = token;

  } catch (error) {
    throw new Error(error);
  }

  next();
};

export default auth;
