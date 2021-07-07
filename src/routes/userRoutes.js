const express = require('express')
const userRoutes = express.Router()
const multer = require('multer')
const path = require('path')

const { isFileImage } = require('../helpers/file')

const validationNewUser = require('../middlewares/validationNewUser')
const validationAuthUser = require('../middlewares/validationAuthUser')
const validationLoginUser = require('../middlewares/validationLoginUser')


const userController = require('../controllers/userController')


// nombre del archivo
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // guardamos el destino de la carpeta absoluta
        const detinationPath = path.join(__dirname, '../../public/img/users')
            // llamamos al callback con error (null) y el path de donde guardaría el archivo
        cb(null, detinationPath)
    },
    filename: (req, file, cb) => {
        // El nombre del archivo original es: file.originalname
        const extension = path.extname(file.originalname) // .jpg

        // generamos un identificador único a partir de la fecha
        const now = Date.now() // 32173821637218631

        // generar un nombre para nuestro archivo
        //const filename = `${now}${extension}`
        const filename = now + extension

        // ejecutamos callback con null (error) y el nombre del archivo
        cb(null, filename)
    },
})

// fileFilter es un byPass para que multer guarde o no el archivo
const fileFilter = (req, file, cb) => {
    if (!file) {
        cb(null, false)

        // corta ejecución
        return
    }

    if (!isFileImage(file.originalname)) {
        // gonza workaround para que llegue a express-validator el archivo
        req.file = file

        cb(null, false)

        // corta ejecución
        return
    }

    // Si aceptamos el archivo
    cb(null, true)

}

const upload = multer({ storage, fileFilter })

/*const { body, validationResult } = require('express-validator');*/

/* Llamados a UserController */
userRoutes.get('/list', userController.list)


userRoutes.get('/login', userController.login)
userRoutes.post('/login', validationLoginUser, userController.processLogin)

userRoutes.get('/reset_account', userController.reset_account)

userRoutes.get('/register', userController.register)
userRoutes.post('/register', upload.single('image'), validationNewUser, userController.storeUser)

userRoutes.get('/profile', validationAuthUser, userController.profile)
userRoutes.get('/logout', validationAuthUser, userController.logout)

userRoutes.get('/cart', userController.cart)




module.exports = userRoutes