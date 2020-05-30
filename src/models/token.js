import mongoose from "mongoose";
import validator from "validator";
import { timestamp } from "./plugins/timestamp.js";


let tokenSchema = new mongoose.Schema({
  token: {
    type: String,
    unique: true,
    required: true
  },
  user:{
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
    ref: 'User'
  }
})

const Token = mongoose.model('Token',tokenSchema)

export default Token;