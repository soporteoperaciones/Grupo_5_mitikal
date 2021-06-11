const express = require('express')
const productRoutes = express.Router()
const multer = require('multer')
const path = require('path')

const productController = require('../controllers/productController')

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

/* Llamados a productController */
productRoutes.get('/market', productController.market)
productRoutes.get('/market_test', productController.market_test)
productRoutes.get('/novedades', productController.novedades)
productRoutes.get('/destacados', productController.destacados)
productRoutes.get('/detalleProducto', productController.detalleProducto)
productRoutes.get('/createProduct', productController.createProduct)
productRoutes.post('/createProduct', upload.single('image'), productController.createProduct)
productRoutes.get('/updateProduct', productController.updateProduct)
productRoutes.put('/updateProduct', upload.single('image'), productController.updateProduct)


/*indexRoutes.get('/prueba', indexController.prueba) */

module.exports = productRoutes