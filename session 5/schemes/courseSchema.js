import zod from "zod"
import { httpStatusText } from "../utils/httpStatusText.js";
import appError from "../utils/appError.js";

export const newCourseSchema = zod.object({
  title: zod.string().min(2, {message: "Name must be at least 2 characters long"}),
  price: zod.number().min(1, {message: "Price must be at least 1"})
})

export const validate = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const error = appError.create(result.error.issues[0].message, 400, httpStatusText.Fail)
      return next(error)
    }

    req.validatedData = result.data;
    next();
  };
};