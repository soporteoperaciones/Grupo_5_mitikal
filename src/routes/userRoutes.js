const express = require('express')
const userRoutes = express.Router()
const path = require('path')

const userController = require('../controllers/userController')

/* Llamados a UserController */
userRoutes.get('/login', userController.login)
userRoutes.get('/reset_account', userController.reset_account)
userRoutes.get('/register', userController.register)
userRoutes.get('/cart', userController.cart)


module.exports = userRoutes