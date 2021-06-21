const { body } = require('express-validator')
const userModel = require('../models/userModel')
const path = require('path')

const validationNewUser = [
    body('name')
    .notEmpty()
    .withMessage('Por favor ingrese un nombre de Usuario')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Por favor ingrese un Nombre con mas de 3 caracteres'),

    body('email')
    .notEmpty()
    .withMessage('Por favor ingrese su email')
    .isEmail()
    .withMessage('No es en formato e-mail')
    .bail()
    .custom((email) => {
        const userFound = userModel.findByField('email', email)

        if (userFound) {
            return false
        }

        return true
    })
    .withMessage('El usuario ya existe'),

    body('tel')
    .notEmpty()
    .withMessage('Por favor ingrese telefono fijo o Celular')
    .bail()
    .isLength({ min: 3 })
    .withMessage('El valor no corresponde a un numero de celular'),

    body('password1')
    .notEmpty()
    .withMessage('Por favor ingrese password1')
    .bail()
    .isLength({ min: 3 })
    .withMessage('El password debe ser mayor a 3 caracteres'),

    body('password2')
    .notEmpty()
    .withMessage('Por favor ingrese un password2')
    .isLength({ min: 3 })
    .withMessage('El password debe ser mayor a 3 caracteres')

]

module.exports = validationNewUser