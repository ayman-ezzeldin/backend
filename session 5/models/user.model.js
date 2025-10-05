import mongoose from "mongoose"
import validator from "validator"
import { userRoles } from "../utils/userRoles.js"

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Please provide a valid email"]
  },
  password: {
    type: String,
    required: true
  },
  token: {
    type: String
  }, 
  role : {
    type: String,
    enum: Object.values(userRoles),
    default: userRoles.USER
  }
})

export default mongoose.model("User", userSchema)