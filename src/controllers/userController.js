const fs = require('fs')

const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')

const userModel = require('../models/userModel') //

const { User } = require('../database/models')
const { Op } = require('sequelize')
const { maxAgeUserCookie } = require('../config/config')



const userController = {
    list: (req, res) => {
        User.findAll({
                order: [
                    ['name', 'ASC']
                ],
            })
            .then(userList => {
                res.render('users/list', { userList })
            })
    },

    login: (req, res) => {
        res.render('users/login')
    },

    processLogin: async(req, res) => {
        const formValidation = validationResult(req)
        const oldValues = req.body

        if (!formValidation.isEmpty()) {
            return res.render('users/login', { oldValues, errors: formValidation.mapped() })
        }

        const { email, remember } = req.body

        const user = await User.findOne({
            where: {
                email
            }
        })

        req.session.logged = user.id

        console.log(req.session.logged)

        if (remember) {

            res.cookie('user', user.id, {
                maxAge: maxAgeUserCookie,

                signed: true,
            })
        
        }



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
        console.log(oldValues)
        if (!formValidation.isEmpty()) {

            if (req.file) {
                // primero chequeamos que exista
                fs.unlinkSync(req.file.path)
            }


            res.render('users/register', { oldValues, errors: formValidation.mapped() })
            return
        }


        const { name, email, tel, password1, password2 } = req.body;

        const { file } = req

        const image = file.filename

        const hashPassword1 = bcrypt.hashSync(password1)
        const hashPassword2 = bcrypt.hashSync(password2)

        const newUser = {
            name: name,
            email: email,
            tel: tel,
            password1: hashPassword1,
            password2: hashPassword2,
            image: '/img/users/' + image,
        }

        /*const productCreated = */
        User.create(newUser)
            .then(() => {
                res.redirect('/users/login');
            })




    },


    cart: (req, res) => {
        return res.render('./products/cart')
    },

    profile: (req, res) => {
        res.render('users/profile')
    },

    logout: (req, res) => {
        req.session.destroy()
        res.clearCookie('user')

        res.redirect('/')

    }
}

module.exports = userController