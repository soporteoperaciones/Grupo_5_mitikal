const express = require('express')
const userRoutes = express.Router()
const path = require('path')

const userController = require('../controllers/userController')

/* Llamados a UserController */
userRoutes.get('/login', userController.login)
const { body, validationResult } = require('express-validator');

userRoutes.post(
    '/login',
    // username must be an email
    body('email').isEmail(),
    // password must be at least 5 chars long
    body('password').isLength({ min: 5 }),
    (req, res) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        User.create({
            email: req.body.email,
            password: req.body.password,
        }).then(user => res.json(user));
    },
);
userRoutes.get('/reset_account', userController.reset_account)
userRoutes.get('/register', userController.register)
userRoutes.get('/cart', userController.cart)


module.exports = userRoutes