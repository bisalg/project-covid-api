const express = require('express')
const Router = express.Router()
const {
    User_Registration,
    User_Login
} = require('../controller_logics/user_register&login')

Router.route('/register').post(User_Registration)
Router.route('/login').post(User_Login)

module.exports = Router;