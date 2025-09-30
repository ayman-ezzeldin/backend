import express from "express";
import courseRouter from "./routes/course.route.js";
import mongoose from "mongoose";
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/courses", courseRouter);


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});




mongoose
  .connect("mongodb+srv://aymanmae12_db_user:Tw4AoSmeB2456MS2@backendcodezone.ohrzhpc.mongodb.net/?retryWrites=true&w=majority&appName=backendCodeZone")
  .then(() => console.log("Connected to MongoDB)"))
  .catch((err) => console.log(err));
