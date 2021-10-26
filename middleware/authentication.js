const jwt = require('jsonwebtoken')
const User_Model = require('../models/userModel')
const { UnAuthorized } = require('../errors')


//Authentication setup to check token 

const authentication = async (req, res, next) => {

    const auth = req.headers.authorization

    if (auth && auth.startsWith('Bearer ') && !auth.startsWith('Bearer null')) {
        const token = auth.split(' ')[1]

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const { _id, name } = decoded

        // to check if a forged token is used to get access
        try {
            await User_Model.findById(_id)
        } catch (err) {
            throw new UnAuthorized('token is forged, malicious activity!!!')
        }

        req.user = { _id, name }
        next()
    } else throw new UnAuthorized('No token present, Please first Register or Log-in')
}

module.exports = authentication;