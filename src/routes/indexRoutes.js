const express = require('express')
const indexRoutes = express.Router()
const multer = require('multer')
const path = require('path')

const indexController = require('../controllers/indexController')

// destino donde guardar el archivo
// nombre del archivo
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // guardamos el destino de la carpeta absoluta
        const detinationPath = path.join(__dirname, '../../public/img')
            // llamamos al callback con error (null) y el path de donde guardaría el archivo
        cb(null, detinationPath)
    },
    filename: (req, file, cb) => {
        console.log('file', file)
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

const upload = multer({ storage })

indexRoutes.get('/', indexController.index)
indexRoutes.get('/login', indexController.login)
indexRoutes.get('/reset_account', indexController.reset_account)
indexRoutes.get('/register', indexController.register)
indexRoutes.get('/market', indexController.market)
indexRoutes.get('/detalleProducto', indexController.detalleProducto)
indexRoutes.get('/cart', indexController.cart)
indexRoutes.get('/createProduct', indexController.createProduct)
indexRoutes.post('/createProduct', upload.single('image'), indexController.createProduct)
indexRoutes.get('/updateProduct', indexController.updateProduct)
indexRoutes.put('/updateProduct', upload.single('image'), indexController.updateProduct)




/*indexRoutes.get('/prueba', indexController.prueba) */


module.exports = indexRoutes