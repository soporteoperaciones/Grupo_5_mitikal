const path = require('path')
/*const userModel = require('../models/userModel')*/

const userController = {
    login: (req, res) => {
        return res.render('./users/login')
    },
    reset_account: (req, res) => {
        return res.render('./users/reset_account')
    },
    register: (req, res) => {
        return res.render('./users/register')
    },

    cart: (req, res) => {
        return res.render('./products/cart')
    },
}

module.exports = userController