const { StatusCodes } = require('http-status-codes')

const errorhandlerMiddleware = (err, req, res, next) => {
    const ErrObj = {
        statusCode: err.status || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'something went wrong'
    }

    // setup for validationerror
    if (err.name === 'ValidationError') {
        ErrObj.statusCode = 400;
        ErrObj.msg = Object.values(err.errors).map(item => item.message).join(',')
    }

    // setup for duplicate/unique error
    if (err.code && err.code === 11000) {
        ErrObj.msg = `${Object.keys(err.keyValue)} already registered`
        ErrObj.statusCode = 400
    }

    //setup for casterror
    if (err.name === 'CastError') {
        ErrObj.msg = `not found, id: ${err.value} doesn\'t match the id pattern`
        ErrObj.statusCode = 404
    }

    //setup for invalid token error
    if (err.message === 'invalid token') {
        ErrObj.statusCode = 401;
        ErrObj.msg = 'token varification failed'
    }
    res.status(ErrObj.statusCode).json({ error: ErrObj.msg })
}

module.exports = errorhandlerMiddleware;