const express = require('express')
const productRoutes = express.Router()
const multer = require('multer')
const path = require('path')

const { isFileImage } = require('../helpers/file')

const validationNewProduct = require('../middlewares/validationNewProduct')

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
productRoutes.use('/market', productController.market)
productRoutes.get('/market_test', productController.market_test)
productRoutes.get('/releases', productController.releases)
productRoutes.get('/important', productController.important)
productRoutes.get('/detailProduct/:id?', productController.detailProduct)
productRoutes.get('/createProduct', productController.createProduct)
productRoutes.post('/createProduct', upload.single('image'), validationNewProduct, productController.storeProduct)
productRoutes.get('/:id/editProduct', productController.editProduct)
/*productRoutes.put('/:id', productController.editProduct)*/
productRoutes.put('/:id', upload.single('image'), productController.update)

// Delete
productRoutes.delete('/:id', productController.destroy);


/*indexRoutes.get('/prueba', indexController.prueba) */

module.exports = productRoutes