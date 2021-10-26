const express = require('express')
const Router = express.Router()
const publicAPI = require('../controller_logics/public_api')

Router.route('/').get(publicAPI)

module.exports = Router;