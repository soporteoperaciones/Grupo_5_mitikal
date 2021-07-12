const { validationResult } = require('express-validator')
const path = require('path')
const productsModel = require('../models/productsModel')
const fs = require('fs')
const { Product } = require('../database/models')
const { Op } = require('sequelize')

const productController = {

    list: (req, res) => {
        Product.findAll({
                order: [
                    ['name', 'ASC']
                ],
            })
            .then(productList => {
                res.render('products/list', { productList })
            })
    },
    //const productList = productsModel.findAll()

    // aca leo el json y se lo paso al template
    // res.render('planets/list', { planetList: planetList })
    //res.render('products/list', { productList })
    //    },
    market: (req, res) => {
        return res.render('./products/market')
    },

    market_test: (req, res) => {
        const productList = productsModel.findAll()
            // aca leo el json y se lo paso al template
            // res.render('planets/list', { planetList: planetList })
        res.render('./products/market_test', { productList })

    },

    releases: (req, res) => {
        return res.render('./products/market')
    },

    important: (req, res) => {
        return res.render('./products/market')
    },


    detailProduct: (req, res) => {
        const { id } = req.params
            //const productDetail = productsModel.findByPk(id)

        Product.findByPk(id)
            .then(productDetail => {
                res.render('products/detailProduct', { productDetail })
            })
    },

    createProduct: (req, res) => {
        return res.render('./products/createProduct')
    },

    storeProduct: (req, res) => {
        const formValidation = validationResult(req)

        /* si encuentro un error devuelvo el formulario
        con los valores ya cargados y los errores */
        console.log('formValidation.mapped()', formValidation.mapped())

        if (!formValidation.isEmpty()) {
            // borrar imagen
            if (req.file) {
                // primero chequeamos que exista
                fs.unlinkSync(req.file.path)
            }


            // tenemos errores
            const oldValues = req.body
            res.render('products/createProduct', { oldValues, errors: formValidation.mapped() })
            return
        }


        // Crear el objeto producto
        const { name, description, category, color, size, price } = req.body;

        // dentro de req.file va a venir la información del archivo
        const { file } = req

        // nuestra ruta al archivo
        const image = file.filename

        const newProduct = {
            name: name,
            description: description,
            category: category,
            color: color,
            size: size,
            price: price,
            image: '/img/' + image,
        }

        const productCreated = productsModel.create(newProduct);

        /*redireccionamiento*/

        res.redirect('/detailProduct' + productCreated.id);
    },

    editProduct: (req, res) => {
        const product = productsModel.findByPk(req.params.id);

        res.render('products/updateProduct', {
            product
        });
    },
    update: (req, res) => {
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

        res.redirect('/detailProduct/' + id);
    },

    destroy: (req, res) => {
        const id = req.params.id;

        productsModel.destroy(id);

        res.redirect('/list');
    }
}

module.exports = productController