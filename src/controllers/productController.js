const path = require('path')
const productsModel = require('../models/productsModel')

const productController = {
    market: (req, res) => {
        return res.render('./products/market')
    },

    market_test: (req, res) => {
        const productList = productsModel.findAll()
            // aca leo el json y se lo paso al template
            // res.render('planets/list', { planetList: planetList })
        res.render('./products/market_test', { productList })

    },

    novedades: (req, res) => {
        return res.render('./products/market')
    },

    destacados: (req, res) => {
        return res.render('./products/market')
    },


    detalleProducto: (req, res) => {
        return res.render('./products/detalleProducto')
    },

    createProduct: (req, res) => {
        return res.render('./products/createProduct')
    },

    updateProduct: (req, res) => {
        const data = req.body;
        const { id } = req.params;
        // el producto original
        const productoOriginal = productsModel.findByPk(id)
            // la imagen original: productoOriginal.image

        // dentro de req.file va a venir la información del archivo
        const { file } = req

        /* Si viene una imagen nueva, cargar la imagen nueva
        sino poner la original */
        let image

        if (file) {
            image = '/img/' + file.filename
        } else {
            image = productoOriginal.image
        }
        data.image = image

        productsModel.update(data, id);

        res.redirect('/products/detalleProduct/' + id);
    },
}

module.exports = productController