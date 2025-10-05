import jwt from "jsonwebtoken"
import appError from "../utils/appError.js";
import { httpStatusText } from "../utils/httpStatusText.js";
export const verifiyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
  return next(appError.create("Authorization header is required", 401, httpStatusText.Fail));
}

if (!authHeader.startsWith("Bearer ")) {
  return next(appError.create("Invalid Authorization header format", 401, httpStatusText.Fail));
}

  const token = authHeader.split(" ")[1]

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

    req.user = decodedToken
    next();

  } catch (error) {
    return next(appError.create("Invalid token", 401, httpStatusText.Fail));
  }

  
}