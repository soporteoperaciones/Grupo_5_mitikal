const { body } = require('express-validator')
const path = require('path')

const validationNewUser = [
    body('name')
    .notEmpty()
    .withMessage('Por favor ingrese un nombre de name')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Por favor un nombre más name'),
    
    body('email')
    .notEmpty()
    .withMessage('Por favor email')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Por favor email'),

    body('tel')
    .notEmpty()
    .withMessage('Por favor ingrese tel')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Por favor ingrese tel'),
    
    body('password1')
    .notEmpty()
    .withMessage('Por favor ingrese password1')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Por favor ingrese password1'),

    body('password2')
    .notEmpty()
    .withMessage('Por favor ingrese un password2')
    .isLength({ min: 3 })
    .withMessage('Por favor ingrese un password2')

]

module.exports = validationNewUser