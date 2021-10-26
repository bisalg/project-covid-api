const { BadRequest, NotFound } = require('../errors');
const VaccinationDetails_Model = require('../models/vaccinationModel')
const { StatusCodes } = require('http-status-codes')

//----After registering or logging in (if already registered) our user will be able to send following requests-----


//here user can get all the vaccination entries made by him of himself or of others in the database.

const getAllVaccninationEntries = async (req, res) => {
    const { _id } = req.user

    const allVaccinated = await VaccinationDetails_Model.find({ uploaderId: _id })

    res.status(StatusCodes.OK).json({ all: allVaccinated })
}


//here user can make single vaccination entry in the database

const postVaccinationEntry = async (req, res) => {
    const ipAddress = req.header('x-forwarded-for') || req.socket.remoteAddress;

    const { body: { firstDose, secondDose }, user: { _id } } = req

    req.body.uploaderId = _id
    req.body.uploader_IpAddress = ipAddress

    if (firstDose === false) throw new BadRequest('first dose can\'t be false')

    if (firstDose * secondDose)
        req.body.vaccinationStatus = 'fully-vaccinated'
    else
        req.body.vaccinationStatus = 'half-vaccinated'

    const vaccinated = await VaccinationDetails_Model.create(req.body)

    res.status(StatusCodes.OK).json({ vaccinated })
}


//for updation of the any particular entry specifies by :id param 

const updateVaccinationEntry = async (req, res) => {
    let { params: { id }, user: { _id }, body: { secondDose } } = req

    if (secondDose === false) throw new BadRequest('updation of secondDose can\'t be false')

    let data = await VaccinationDetails_Model.findOne({ _id: id, uploaderId: _id })
    if (!data) throw new NotFound('not found')
    const { firstDose } = data

    if (firstDose * secondDose) req.body.vaccinationStatus = 'fully vaccinated'

    const updated = await VaccinationDetails_Model
        .findOneAndUpdate({ _id: id, uploaderId: _id }, req.body, { new: true, runValidators: true })

    res.status(StatusCodes.OK).json({ updated })
}

module.exports = {
    getAllVaccninationEntries,
    postVaccinationEntry,
    updateVaccinationEntry
}