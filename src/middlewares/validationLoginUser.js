const { body } = require('express-validator')
const bcrypt = require('bcryptjs')
const userModel = require('../models/userModel')

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
        .custom((value, { req }) => {
            const { email, password } = req.body
            
            // encontrar un usuario con el email
            const userFound = userModel.findByField('email', email)

            // chequear que userFound exista
            if (userFound) {
                console.log("Usuario no validado")
                // comparar contraseñas
                const passwordMatch = bcrypt.compareSync(password, userFound.password1) 
                if (passwordMatch) {
                    return true
                }
            }

            console.log("Usuario no validado")
            return false
        })
    .withMessage('El usuario o la contraseña son inválidas'),
]

module.exports = validationLoginUser