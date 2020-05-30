import mongoose from "mongoose";
import validator from "validator";
import { timestamp } from "./plugins/timestamp.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import TokenModel from "./token.js";

let userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 4,
  },
});

// userSchema.virtual('tokens', {
//   ref: 'Token',
//   localField: '_id',
//   foreignField: 'user',
// });


userSchema.plugin(timestamp);

userSchema.pre("save", async function (next) {
  try {
    const user = this;
    if (user.isModified("password")) {
      user.password = await bcrypt.hash(user.password, 8);
    }
    next();
  } catch (e) {
    throw new Error(e);
  }
});

userSchema.methods.generateAuthToken = async function () {
  
  const user = this;
  
  const token = jsonwebtoken.sign(
    { _id: user._id.toString() },
    "Don'tShareThis"
    );
    
    if (token) {
      const tokenModel = new TokenModel({ token, user: user._id });
      await tokenModel.save();
    }
    
    return token;
  };
  
  userSchema.statics.findByCredentials = async (emailOrUsername, password) => {
    
    const user = await User.isUserExist(emailOrUsername, emailOrUsername);
    
    if (!user) {
      throw new Error("Invalid credentials");
    }
    
    const isPwdMatch = await bcrypt.compare(password, user.password);
    if (!isPwdMatch) {
      throw new Error("Invalid credentials");
    }
    
    return user;
  };
  
  userSchema.statics.isUserExist = async (email, username) => {
    const isUserExist = await User.findOne({
      $or: [{ email } , { username }],
    });
    
    return isUserExist;
  }
  
  userSchema.virtual('results', {
    ref: 'Result',
    localField: '_id',
    foreignField: 'user'
  });

  userSchema.virtual('quizzes', {
    ref: 'Quiz',
    localField: '_id',
    foreignField: 'user'
  });

  userSchema.virtual('questions', {
    ref: 'Question',
    localField: '_id',
    foreignField: 'user'
  });

  userSchema.set('toObject', { virtuals: true });
  userSchema.set('toJSON', { virtuals: true });

  const User = mongoose.model("User", userSchema);
  
  export default User;
  