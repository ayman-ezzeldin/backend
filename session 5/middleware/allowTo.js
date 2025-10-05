import appError from "../utils/appError.js";
import { httpStatusText } from "../utils/httpStatusText.js";

export const allowTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.currentUser.role)) {
      return next(appError.create("You are not allowed to access this route", 403, httpStatusText.Fail));
    }
    next();
  }
}