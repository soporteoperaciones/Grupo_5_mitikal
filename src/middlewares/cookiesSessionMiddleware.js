const usersModel = require('../models/userModel')
const { User } = require('../database/models');

module.exports = (req, res, next) => {
    const userCookie = req.signedCookies.user
    if (userCookie) {
        req.session.logged = userCookie
    }
    next()
}