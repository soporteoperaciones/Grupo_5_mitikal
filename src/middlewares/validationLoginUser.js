const { body } = require('express-validator')
const bcrypt = require('bcryptjs')
const userModel = require('../models/userModel')
const { User } = require('../database/models')

const validationLoginUser = [
    body('email')
    .notEmpty()
    .withMessage('Por favor ingrese su e-mail')
    .isEmail()
    .withMessage('No es en formato e-mail'),
    body('password')
    .notEmpty()
    .withMessage('Por favor ingrese su password')
    .bail()
    .custom(async(value, { req }) => {
        const { email, password } = req.body

        const userFound = await User.findOne({
            where: {
                email
            }
        })
        if (userFound) {
            console.log('encontre el usuario')

            const passwordMatch = bcrypt.compareSync(req.body.password, userFound.password1)
            console.log(passwordMatch)

            if (!passwordMatch) {
                return Promise.reject('Usuario o Password Invalidos !!')
            }


            return true
        } else {
            return Promise.reject('Usuario o Password Invalidos!!')
        }


    }),
]

module.exports = validationLoginUser