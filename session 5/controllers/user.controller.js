import { asyncWrapper } from "../middleware/asyncWrapper.js";
import User from "../models/user.model.js";
import { httpStatusText } from "../utils/httpStatusText.js";

export const fetchAllUsers = asyncWrapper(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({ status: httpStatusText.Success, data: users });
})

export const registerUser = asyncWrapper(async (req, res, next) => {
  console.log(req.body);
  
  const { fristName, lastName, email, password } = req.body;
  const newUser = new User({ fristName, lastName, email, password });
  await newUser.save();
  res.status(201).json({ status: httpStatusText.Success, data: newUser });
})