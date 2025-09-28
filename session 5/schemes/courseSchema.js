import zod from "zod"

export const newCourseSchema = zod.object({
  name: zod.string().min(2, {message: "Name must be at least 2 characters long"}),
})

export const validate = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: result.error.issues[0].message
      });
    }

    req.validatedData = result.data;
    next();
  };
};