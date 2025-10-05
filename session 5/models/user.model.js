import mongoose from "mongoose"
import validator from "validator"

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
  }
})

export default mongoose.model("User", userSchema)