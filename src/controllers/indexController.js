const path = require('path')
const productsModel = require('../models/productsModel')

const indexController = {
    index: (req, res) => {
        return res.render('index')
    },
    login: (req, res) => {
        return res.render('./users/login')
    },
    reset_account: (req, res) => {
        return res.render('./users/reset_account')
    },
    register: (req, res) => {
        return res.render('./users/register')
    },
    market: (req, res) => {
        return res.render('./products/market')
    },

    detalleProducto: (req, res) => {
        return res.render('./products/detalleProducto')
    },
    cart: (req, res) => {
        return res.render('./products/cart')
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

        res.redirect('/products/detalleProdduct/' + id);
    },
}

module.exports = indexController