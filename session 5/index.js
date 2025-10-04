import express from "express";
import courseRouter from "./routes/course.route.js";
import userRouter from './routes/user.route.js'
import mongoose from "mongoose";
import cors from 'cors'
import dotenv from "dotenv";
import { httpStatusText } from "./utils/httpStatusText.js";

dotenv.config();
const app = express();
const port = 3000;


app.use(cors()) // provide cors for all routes
app.use(express.json()); // to parse JSON bodies (that send from client)


app.use("/api/courses", courseRouter);
app.use("/api/users", userRouter);

// Global Routes error handler (in case of the route doesn't exist)
app.use((req, res) => {
  return res.status(404).json({ status: httpStatusText.Error, message: "Endpoint doesn't exist" });
})

// Global error handler
app.use((err, req, res, next) => {
  res.status(500).json({ status: err.statusText || httpStatusText.Error, message: err.message, code: err.statusCode || 500 });
})


app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});




mongoose
  .connect(process.env.MONGODB_RUL)
  .then(() => console.log("Connected to MongoDB)"))
  .catch((err) => console.log(err));
