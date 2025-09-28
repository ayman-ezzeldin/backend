import { courses } from "../data/data.js"

export const fetchAllCoursers = (req, res) => {
  res.send(courses)
}

export const fetchSingleCourse = (req,res) => {
  const courseId = +req.params.courseId
  const course = courses.find((course) => course.id === courseId)

  if (course) {
    res.json(course)
  } else {
    res.status(200).send("Course not found")
  }
}

export const addNewCourse = (req, res) => {
  const newCourse = { id: courses.length + 1, ...req.body}
  courses.push(newCourse)
  res.json({
    message: "Course added successfully",
    courses: courses
  })
}

export const updateCourse = (req,res) => {
  const courseId = +req.params.courseId
  let course = courses.find((course) => course.id === courseId)
  
  if (course) {
    Object.assign(course, req.body);
    res.json({
      message: "Course updated successfully",
      courses: courses
    })
  } else {
    res.status(404).send("Course not found")
  }
}

export const deleteCourse = (req,res) => {
  const courseId = +req.params.courseId
  const course = courses.find((course) => course.id === courseId)
  if(course) {
    courses.splice(courses.indexOf(course),1)
    res.json({
      message: "Course deleted successfully",
      course: course
    })
  } else {
    res.status(404).send("Couldn't delete the course")
  }
}