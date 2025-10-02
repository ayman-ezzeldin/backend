import Course from "../models/course.model.js";
import { httpStatusText } from "../utils/httpStatusText.js";
import { asyncWrapper } from "../middleware/asyncWrapper.js";
import appError from "../utils/appError.js";

export const fetchAllCoursers = asyncWrapper(async (req, res, next) => {
  const courses = await Course.find({}, { __v: false });
  if(courses.length > 0) {
    return res.status(200).json({ status: httpStatusText.Success, data: courses });
  } else {
    return next(appError.create("Course not found", 404, httpStatusText.Fail))
  }
})

export const fetchSingleCourse = asyncWrapper(async (req, res, next) => {
  const course = await Course.findById(req.params.courseId);

  if (course) {
    res.json({ status: httpStatusText.Success, data: course});
  } else {
    return next(appError.create("Course not found", 404, httpStatusText.Fail));
  }
});

// I handled the error in the middleware using validate(courseSchema)
export const addNewCourse = asyncWrapper(async (req, res, next) => {

  const newCourse = new Course(req.body);
  await newCourse.save();

  return res.status(201).json({
    status: httpStatusText.Success,
    data: newCourse,
  });
});

export const updateCourse = asyncWrapper(async (req, res) => {
  const id = req.params.courseId;
    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      { ...req.body },
      { returnDocument: "after" } // I add this to get the updated document not past one
    );

    res.status(200).json({
      status: httpStatusText.Success,
      data: updatedCourse,
    });

})

export const deleteCourse = asyncWrapper(async (req, res) => {
  const id = req.params.courseId;
  const deletedCourse = await Course.findByIdAndDelete(id);
  res.status(200).json({
    status: httpStatusText.Success,
    data: deletedCourse
  })
})
