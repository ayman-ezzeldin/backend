import express from "express";
import {
  deleteUser,
  fetchAllUsers,
  loginUser,
  registerUser,
} from "../controllers/user.controller.js";
import { verifiyToken } from "../middleware/verifiyToken.js";
import { allowTo } from "../middleware/allowTo.js";
import { userRoles } from "../utils/userRoles.js";
import multer from "multer";
import appError from "../utils/appError.js";
import { httpStatusText } from "../utils/httpStatusText.js";

const Router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    const fileName = `${file.originalname.split(".")[0]}-${Date.now()}.${ext}`;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const ImagType = file.mimetype.split("/")[0];
  if (ImagType === "image") {
    cb(null, true);
  } else {
    cb(
      appError.create("Only images are allowed", 400, httpStatusText.Fail),
      false
    );
  }
};

const upload = multer({ storage: storage, fileFilter });

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: إدارة المستخدمين (تسجيل - تسجيل دخول - حذف - جلب جميع المستخدمين)
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: جلب جميع المستخدمين (Admin فقط)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: قائمة بجميع المستخدمين
 *       403:
 *         description: غير مصرح لك بالوصول
 */
Router.route("/").get(verifiyToken, allowTo(userRoles.ADMIN), fetchAllUsers);

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: تسجيل مستخدم جديد
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Ayman Mohamed"
 *               email:
 *                 type: string
 *                 example: "aymanezz@gmail.com"
 *               password:
 *                 type: string
 *                 example: "aymanezzPass"
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: تم التسجيل بنجاح
 *       400:
 *         description: بيانات غير صحيحة
 */
Router.route("/register").post(upload.single("avatar"), registerUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: تسجيل الدخول
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "aymanezz@gmail.com"
 *               password:
 *                 type: string
 *                 example: "aymanezzPass"
 *     responses:
 *       200:
 *         description: تسجيل الدخول بنجاح
 *       401:
 *         description: البريد الإلكتروني أو كلمة المرور غير صحيحة
 */
Router.route("/login").post(loginUser);

/**
 * @swagger
 * /users/delete/{userId}:
 *   delete:
 *     summary: حذف مستخدم باستخدام الـ ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: معرف المستخدم
 *     responses:
 *       200:
 *         description: تم حذف المستخدم بنجاح
 *       404:
 *         description: المستخدم غير موجود
 */
Router.route("/delete/:userId").delete(deleteUser);

export default Router;
