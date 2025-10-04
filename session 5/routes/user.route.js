import express from 'express'
import { deleteUser, fetchAllUsers, loginUser, registerUser } from '../controllers/user.controller.js'

const Router = express.Router()

Router.route('/')
      .get(fetchAllUsers)

Router.route('/register')
      .post(registerUser)

Router.route('/login')
      .post(loginUser)

Router.route('/delete/:userId')
      .delete(deleteUser)

export default Router