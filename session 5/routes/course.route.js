import express from 'express'
// import { addNewCourse, deleteCourse, fetchAllCoursers, fetchSingleCourse, updateCourse } from '../controllers/course.controller.js'
import { addNewCourse, fetchAllCoursers, fetchSingleCourse } from '../controllers/course.controller.js'
import { newCourseSchema, validate } from '../schemes/courseSchema.js'

const Router = express.Router()

Router.route('/')
      .get(fetchAllCoursers)
      .post(addNewCourse)


Router.route('/:courseId')
      .get(fetchSingleCourse)
//       .patch(updateCourse)
//       .delete(deleteCourse)


export default Router