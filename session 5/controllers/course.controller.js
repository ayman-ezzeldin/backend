import Course from "../models/course.model.js";

export const fetchAllCoursers = async (req, res) => {
  const courses = await Course.find();
  res.send(courses);
};

export const fetchSingleCourse = async (req, res) => {
  const course = await Course.findById(req.params.courseId);

  if (course) {
    res.json(course);
  } else {
    res.status(200).send("Course not found");
  }
};

export const addNewCourse = async (req, res) => {
  try {
    const newCourse = new Course(req.body);

    await newCourse.save();
    res.status(201).json({
      message: "Course added successfully",
      course: newCourse,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateCourse = async (req, res) => {
  const id = req.params.courseId;
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      { ...req.body },
      { returnDocument: "after" } // I add this to get the updated document not past one
    );
    console.log("updated: ", updatedCourse);
    res.status(200).send(updatedCourse);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteCourse = async (req, res) => {
  const id = req.params.courseId;

  try {
    const deletedCourse = await Course.findByIdAndDelete(id);
    res.status(200).json({
      message: "Course deleted successfully",
      course: deletedCourse,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
