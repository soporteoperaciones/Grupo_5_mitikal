const { validationResult } = require('express-validator')
const path = require('path')
const userModel = require('../models/userModel')
const fs = require('fs')

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

    storeUser: (req, res) => {
        const formValidation = validationResult(req)
        const oldValues = req.body

        if (!formValidation.isEmpty()) {
            // borrar imagen
            if (req.file) {
                // primero chequeamos que exista
                fs.unlinkSync(req.file.path)
            }


            res.render('users/register', { oldValues, errors: formValidation.mapped() })
            return
        }


        // Crear el objeto user
        const { name, email, tel, password1, password2 } = req.body;

        const { file } = req

        const image = file.filename

        const newUser = {
            name: name,
            email: email,
            tel: tel,
            password1: password1,
            password2: password2,
            image: '/img/users/' + image,
        }

        /*const productCreated = */
        userModel.create(newUser);

        /*redireccionamiento*/

        res.redirect('/login');
    },


    cart: (req, res) => {
        return res.render('./products/cart')
    },

    logout: (req, res) => {
        // borrar session y cookie
        req.session.destroy()
        res.clearCookie('user')

        res.redirect('/')
    }
}

module.exports = userController