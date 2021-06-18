const express = require('express')
const userRoutes = express.Router()
const path = require('path')

const validationNewUser = require('../middlewares/validationNewUser')

const userController = require('../controllers/userController')

/*const { body, validationResult } = require('express-validator');*/

/* Llamados a UserController */
userRoutes.get('/login', userController.login)
userRoutes.get('/reset_account', userController.reset_account)
userRoutes.get('/register', userController.register)

userRoutes.post('/register', validationNewUser, userController.storeUser)


userRoutes.get('/cart', userController.cart)


module.exports = userRoutes