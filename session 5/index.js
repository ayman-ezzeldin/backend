import express from 'express'
import zod from 'zod'
const app = express()
const port = 3000

app.use(express.json())

const newCourseSchema = zod.object({
  name: zod.string().min(2, {message: "Name must be at least 2 characters long"}),
})

const validate = (schema) => {
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



const courses = [
  {
    id: 1,
    name: "course 1"
  },
  {
    id: 2,
    name: "course 2"
  },
  {
    id: 3,
    name: "course 3"
  }
]

// get all courses
app.get('/api/courses', (req, res) => {
  res.json(courses)
})

// get single course
app.get('/api/courses/:courseId',(req,res) => {
  const courseId = +req.params.courseId
  const course = courses.find((course) => course.id === courseId)

  if (course) {
    res.json(course)
  } else {
    res.status(200).send("Course not found")
  }
})

// add new course 
app.post('/api/courses',validate(newCourseSchema),(req,res) => {
  const newCourse = req.validatedData 
  courses.push({id: courses.length + 1, ...newCourse})
  res.status(201).json({
    message: "Course added successfully",
    courses: courses
  })
})

// update course with id
app.patch('/api/courses/:courseId',(req,res) => {
  const courseId = +req.params.courseId
  let course = courses.find((course) => course.id === courseId)
  
  if (course) {
    Object.assign(course, req.body);
    console.log(course)
    res.json({
      message: "Course updated successfully",
      courses: courses
    })
  } else {
    res.status(200).send("Course not found")
  }
})

// delete course 
app.delete('/api/courses/:courseId',(req,res) => {
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
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})