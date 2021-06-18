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

        /* si encuentro un error devuelvo el formulario
        con los valores ya cargados y los errores */
        console.log('formValidation.mapped()', formValidation.mapped())

        
        if (!formValidation.isEmpty()) {
            // borrar imagen
        /*    if (req.file) {
                // primero chequeamos que exista
                fs.unlinkSync(req.file.path)
            }
            */

            // tenemos errores
            const oldValues = req.body

            console.log(oldValues)            
            res.render('users/register', { oldValues, errors: formValidation.mapped() })
            return
        }
        

        // Crear el objeto user
        const { name, email, tel, password1, password2 } = req.body;

        const newUser = {
            name: name,
            email: email,
            tel: tel,
            password1: password1,
            password2: password2,
        }

        /*const productCreated = */
        userModel.create(newUser);

        /*redireccionamiento*/

        res.redirect('/login' );
    },

    updateProduct: (req, res) => {
        const data = req.body;
        const { id } = req.params;
 
        userModel.update(data, id);

        res.redirect('/login');
    },


    cart: (req, res) => {
        return res.render('./products/cart')
    },
}

module.exports = userController