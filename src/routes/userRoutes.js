const express = require('express')
const userRoutes = express.Router()
const multer = require('multer')
const path = require('path')

const { isFileImage } = require('../helpers/file')

const validationNewUser = require('../middlewares/validationNewUser')
const validationAuthUser = require('../middlewares/validationAuthUser')
const guestMiddleware = require('../middlewares/guestMiddleware')
const validationLoginUser = require('../middlewares/validationLoginUser')


const userController = require('../controllers/userController')



const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        const detinationPath = path.join(__dirname, '../../public/img/users')

        cb(null, detinationPath)
    },
    filename: (req, file, cb) => {

        const extension = path.extname(file.originalname)


        const now = Date.now()


        const filename = now + extension


        cb(null, filename)
    },
})

/*
const fileFilter = (req, file, cb) => {
    if (!file) {
        cb(null, false)

        return
    }

    if (!isFileImage(file.originalname)) {

        req.file = file

        cb(null, false)

        return
    }


    cb(null, true)

}
const upload = multer({ storage, fileFilter })

*/
const upload = multer({ storage })


userRoutes.get('/list', userController.list)


userRoutes.get('/login', validationLoginUser, userController.login)
userRoutes.post('/login', validationLoginUser, userController.processLogin)


userRoutes.get('/reset_account', userController.reset_account)

userRoutes.get('/register', userController.register)
userRoutes.post('/register', upload.single('image'), validationNewUser, userController.storeUser)

userRoutes.get('/profile', validationAuthUser, userController.profile)
userRoutes.get('/logout', validationAuthUser, userController.logout)

userRoutes.get('/cart', userController.cart)




module.exports = userRoutes