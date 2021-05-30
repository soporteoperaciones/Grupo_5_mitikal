const path = require('path')

const indexController = {
    index: (req, res) => {
        return res.render('index')
    },
    login: (req, res) => {
        return res.render('login')
    },
    reset_account: (req, res) => {
        return res.render('reset_account')
    },
    register: (req, res) => {
        return res.render('register')
    },
    market: (req, res) => {
        return res.render('market')
    },

    detalleProducto: (req, res) => {
        return res.render('detalleProducto')
    },
    cart: (req, res) => {
        return res.render('cart')
    },
    prueba: (req, res) => {
        return res.render('prueba')
    },

}

module.exports = indexController