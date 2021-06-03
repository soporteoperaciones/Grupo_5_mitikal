const path = require('path')

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
 /*   prueba: (req, res) => {
        return res.render('prueba')
    },*/

}

module.exports = indexController