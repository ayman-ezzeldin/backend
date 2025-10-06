import express from 'express'
import { deleteUser, fetchAllUsers, loginUser, registerUser } from '../controllers/user.controller.js'
import { verifiyToken } from '../middleware/verifiyToken.js'
import { allowTo } from '../middleware/allowTo.js'
import { userRoles } from '../utils/userRoles.js'
import multer from 'multer'
import appError from '../utils/appError.js'
import { httpStatusText } from '../utils/httpStatusText.js'

const Router = express.Router()

const storage = multer.diskStorage({
      destination: function (req, file, cb) {
      // if but /uploads => 'C:\\uploads\\1759780705516-al.jpeg'
      cb(null, 'uploads') 
      },
      filename: function (req, file, cb) {
      const ext = file.mimetype.split('/')[1];
      const fileName = `${file.originalname.split('.')[0]}-${Date.now()}.${ext}`
      cb(null, fileName)
      }
})

const fileFilter = (req, file, cb) => {
      const ImagType = file.mimetype.split('/')[0];
      if (ImagType === 'image') {
            cb(null, true)
      } else {
            cb(appError.create("Only images are allowed", 400, httpStatusText.Fail), false)
      }
}

const upload = multer({ storage: storage, fileFilter })

Router.route('/')
      .get(verifiyToken, allowTo(userRoles.ADMIN),fetchAllUsers)

Router.route('/register')
      .post(upload.single('avatar'),registerUser)

Router.route('/login')
      .post(loginUser)

Router.route('/delete/:userId')
      .delete(deleteUser)

export default Router