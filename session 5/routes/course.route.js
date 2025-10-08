import express from "express";
import { addNewCourse, fetchAllCoursers, fetchSingleCourse, updateCourse, deleteCourse } from "../controllers/course.controller.js";
import { validate, newCourseSchema } from "../schemes/courseSchema.js";

const Router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: إدارة الكورسات
 */

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: الحصول على جميع الكورسات
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: قائمة بكل الكورسات
 *   post:
 *     summary: إضافة كورس جديد
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       201:
 *         description: تم إنشاء الكورس بنجاح
 */
Router.route("/")
  .get(fetchAllCoursers)
  .post(validate(newCourseSchema), addNewCourse);

/**
 * @swagger
 * /courses/{courseId}:
 *   get:
 *     summary: الحصول على كورس محدد
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: تفاصيل الكورس
 *   patch:
 *     summary: تحديث كورس
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       200:
 *         description: تم التحديث بنجاح
 *   delete:
 *     summary: حذف كورس
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: تم الحذف بنجاح
 */
Router.route("/:courseId")
  .get(fetchSingleCourse)
  .patch(updateCourse)
  .delete(deleteCourse);

export default Router;
