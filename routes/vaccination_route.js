const express = require('express')
const Router = express.Router()
const {
    getAllVaccninationEntries,
    postVaccinationEntry,
    updateVaccinationEntry
} = require('../controller_logics/user_vaccination')

Router.route('/vaccination').post(postVaccinationEntry).get(getAllVaccninationEntries)
Router.route('/vaccination/:id').patch(updateVaccinationEntry)

module.exports = Router;