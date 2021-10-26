const BadRequest = require('./badrequest')
const NotFound = require('./notfound')
const UnAuthorized = require('./unauthorized')
const CustomERR = require('./customerror')

module.exports = {
    BadRequest,
    NotFound,
    UnAuthorized,
    CustomERR
}