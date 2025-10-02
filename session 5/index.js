import express from "express";
import courseRouter from "./routes/course.route.js";
import mongoose from "mongoose";
import cors from 'cors'
import dotenv from "dotenv";
import { httpStatusText } from "./utils/httpStatusText.js";

const app = express();
const port = 3000;


dotenv.config();
app.use(cors())
app.use(express.json());


app.use("/api/courses", courseRouter);

// Global Routes error handler
app.use((req, res) => {
  return res.status(404).json({ status: httpStatusText.Error, message: "Endpoint doesn't exist" });
})

// Global error handler
app.use((err, req, res, next) => {
  res.status(500).json({ status: err.statusText || httpStatusText.Error, message: err.message, code: err.statusCode || 500 });
})


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});




mongoose
  .connect(process.env.MONGODB_RUL)
  .then(() => console.log("Connected to MongoDB)"))
  .catch((err) => console.log(err));
