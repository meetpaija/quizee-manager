import express from "express";
import "./src/db/mongoose.js";
import userRouter from "./src/routers/userRouter.js";
import quizRouter from "./src/routers/quizRouter.js";
import authRouter from "./src/routers/authRouter.js";
import resultRouter from "./src/routers/resultRouter.js";
import questionRouter from "./src/routers/questionRouter.js";
import auth from "./src/middleware/auth.js";

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server is up on port ", port);
});

app.use(express.json());
// app.user(auth)
app.use("/api", auth, userRouter);
app.use("/api", auth, quizRouter);
app.use("/api", auth, resultRouter);
app.use("/api", auth, questionRouter);
app.use(authRouter);
