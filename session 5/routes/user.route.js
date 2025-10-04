import express from 'express'
import { fetchAllUsers, registerUser } from '../controllers/user.controller.js'

const Router = express.Router()

Router.route('/')
      .get(fetchAllUsers)

Router.route('/register')
      .post(registerUser)

export default Router