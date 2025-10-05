import express from 'express'
import { deleteUser, fetchAllUsers, loginUser, registerUser } from '../controllers/user.controller.js'
import { verifiyToken } from '../middleware/verifiyToken.js'
import { allowTo } from '../middleware/allowTo.js'
import { userRoles } from '../utils/userRoles.js'

const Router = express.Router()

Router.route('/')
      .get(verifiyToken, allowTo(userRoles.ADMIN),fetchAllUsers)

Router.route('/register')
      .post(registerUser)

Router.route('/login')
      .post(loginUser)

Router.route('/delete/:userId')
      .delete(deleteUser)

export default Router