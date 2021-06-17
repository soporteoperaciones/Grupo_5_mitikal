const { body } = require('express-validator')
const path = require('path')

const { isFileImage } = require('../helpers/file')

const validationNewProduct = [
    body('name')
    .notEmpty()
    .withMessage('Por favor ingrese un nombre de producto')
    .bail()
    //
    .isLength({ min: 3 })
    .withMessage('Por favor un nombre más largo'),
    body('image')
    .custom((value, { req }) => {
        const { file } = req

        console.log('file', file)

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

module.exports = validationNewProduct