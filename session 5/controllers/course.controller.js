import Course from "../models/course.model.js"

export const fetchAllCoursers = async (req, res) => {
  const courses = await Course.find()
  res.send(courses)
}

export const fetchSingleCourse = async (req,res) => {
  const course = await Course.findById(req.params.courseId)

  if (course) {
    res.json(course)
  } else {
    res.status(200).send("Course not found")
  }
}

export const addNewCourse = async (req, res) => {
  try {
    const newCourse = new Course(req.body);

    await newCourse.save();
    res.status(201).json({
      message: "Course added successfully",
      course: newCourse
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// export const updateCourse = (req,res) => {
//   const courseId = +req.params.courseId
//   let course = courses.find((course) => course.id === courseId)
  
//   if (course) {
//     Object.assign(course, req.body);
//     res.json({
//       message: "Course updated successfully",
//       courses: courses
//     })
//   } else {
//     res.status(404).send("Course not found")
//   }
// }

// export const deleteCourse = (req,res) => {
//   const courseId = +req.params.courseId
//   const course = courses.find((course) => course.id === courseId)
//   if(course) {
//     courses.splice(courses.indexOf(course),1)
//     res.json({
//       message: "Course deleted successfully",
//       course: course
//     })
//   } else {
//     res.status(404).send("Couldn't delete the course")
//   }
// }