import { asyncWrapper } from "../middleware/asyncWrapper.js";
import User from "../models/user.model.js";
import appError from "../utils/appError.js";
import { httpStatusText } from "../utils/httpStatusText.js";
import bcrypt from "bcrypt"
import { generateToken } from "../utils/generateToken.js";

export const fetchAllUsers = asyncWrapper(async (req, res, next) => {
  const query = req.query;
  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;

  const users = await User.find({},{ "__v": false, "password": false }).limit(limit).skip(skip);
  res.status(200).json({ status: httpStatusText.Success, data: users });
})

export const registerUser = asyncWrapper(async (req, res, next) => {
  
  const { firstName, lastName, email, password, role } = req.body;
  const oldUser = await User.findOne({ email });
  if (oldUser) {
    return next(appError.create("User already exists", 400, httpStatusText.Fail));
  }

  const hasedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ firstName, lastName, email, password: hasedPassword, role });

  const token = generateToken({ id: newUser._id, email: newUser.email, role: newUser.role });
  newUser.token = token

  await newUser.save();

  const userData = newUser.toObject();
  delete userData.__v;

  res.status(201).json({ status: httpStatusText.Success, data: userData });
})

export const loginUser = asyncWrapper(async(req, res, next) => {
  const { email, password} = req.body;
  const user = await User.findOne({ email })

  if (!user) {
    return next(appError.create("User not found", 404, httpStatusText.Fail));
  }

  const isPasswordValid = bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    return next(appError.create("Invalid password", 401, httpStatusText.Fail));
  }

  const token = generateToken({ id: user._id, email: user.email, role: user.role });

  res.status(200).json({ status: httpStatusText.Success, data: {token: token}, role: user.role, message: "User loggenin" });
})

export const deleteUser = asyncWrapper(async (req, res, next) => {
  const id = req.params.userId;
  const deletedUser = await User.findByIdAndDelete(id);
  res.status(200).json({
    status: httpStatusText.Success,
    data: deletedUser
  })
})