const { validationResult } = require('express-validator')
const path = require('path')
const userModel = require('../models/userModel')
const fs = require('fs')
const { maxAgeUserCookie } = require('../config/config')
const bcrypt = require('bcryptjs')


const userController = {
    login: (req, res) => {
        return res.render('users/login')
    },

    processLogin: (req, res) => {
        console.log("estamos aca");
        const formValidation = validationResult(req)
        const oldValues = req.body

        if (!formValidation.isEmpty()) {
            return res.render('users/login', { oldValues, errors: formValidation.mapped() })
        }

        // lo que viene del login
        const { email, remember } = req.body

        // le pedimos al modelo el usuario
        const user = usersModel.findByField('email', email)
            //req.session = {}

        // cargamos los datos del usuario en la sesión

        // le sacamos el password
        delete user.password

        // cargamos dentro de la sesión la propieda logged con el usuario (menos el password)
        req.session.logged = user

        // guardamos un dato de nuestro usuario en la sesión (email, user_id)
        if (remember) {
            // clave
            res.cookie('user', user.id, {
                maxAge: maxAgeUserCookie
            })
        }


        // redirigimos al profile
        res.redirect('/users/profile')

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


        // hashear el password
        const hashPassword = bcrypt.hashSync(password1)
    
        const newUser = {
            name: name,
            email: email,
            tel: tel,
            password1: hashPassword,
            password2: hashPassword,
            image: '/img/users/' + image,
        }

        /*const productCreated = */
        userModel.create(newUser);

        /redireccionamiento/

        res.redirect('/login');
    },


    cart: (req, res) => {
        return res.render('./products/cart')
    },

    profile: (req, res) => {
        res.render('users/profile')
    },

    logout: (req, res) => {
        // borrar session y cookie
        req.session.destroy()
        res.clearCookie('user')

        res.redirect('/')
    }
}

module.exports = userController