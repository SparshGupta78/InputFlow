//External modules
const express = require('express')

//Local modules
const authController = require('../controllers/authController')

const authRouter = express.Router()

authRouter.get('/signup', authController.signupController)

authRouter.post('/signup', authController.signupSubmitController)

authRouter.get('/login', authController.loginController)

authRouter.post('/login', authController.loginSubmitController)

authRouter.get('/logout', authController.logoutController)

module.exports = authRouter