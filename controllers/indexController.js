const path = require('path')

const indexController = {
    login: (req, res) => {
        res.sendFile(path.resolve('Views/login.html'))
    },
    reset_account: (req, res) => {
        res.sendFile(path.resolve('Views/reset_account.html'))
    },
    register: (req, res) => {
        res.sendFile(path.resolve('Views/register.html'))
    },
    market: (req, res) => {
        res.sendFile(path.resolve('Views/market.html'))
    },

    detalleProducto: (req, res) => {
        res.sendFile(path.resolve('Views/detalleProducto.html'))
    },
    cart: (req, res) => {
        res.sendFile(path.resolve('Views/cart.html'))
    },

}

module.exports = indexController