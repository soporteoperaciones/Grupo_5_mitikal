const { body } = require('express-validator')
const userModel = require('../models/userModel')
const { isFileImage } = require('../helpers/file')
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
            return true
        }

        return true
    })
    .withMessage('El email ya se encuantra registrado'),

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
    .bail(),

    body('image')
    .custom((value, { req }) => {
        const { file } = req

        // chequea que haya cargado imagen
        if (!file) {
            // esto es como si hicieramos .withMessage('Seleccione un archivo')
            throw new Error('Por favor ingrese una imagen')
        }


        if (!isFileImage(file.originalname)) {
            // disparar error
            throw new Error('Por favor ingrese una archivo que sea una imagen')
        }

        // chequea que la extensión sea la correcta

        return true
    })

]

module.exports = validationNewUser