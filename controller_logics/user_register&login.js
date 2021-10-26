const User_Model = require('../models/userModel')
const { StatusCodes } = require('http-status-codes')
const { BadRequest, UnAuthorized } = require('../errors')


//logic for registering user

const User_Registration = async (req, res) => {
    const registered = await User_Model.create(req.body)
    const token = registered.getToken()
    const { _id, name } = registered
    res.status(StatusCodes.CREATED).json({ userinfo: { _id, name }, token })
}

//logic for loggin in user if already registered

const User_Login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) throw new BadRequest('incomplete credentials !')

    const user = await User_Model.findOne({ email })

    if (!user) throw new BadRequest('email not registered, please register first')

    const password_flag = await user.comparePassword(password)

    if (password_flag === false) throw new UnAuthorized('wrong password !')
    const token = user.getToken()
    const { _id, name } = user
    res.status(StatusCodes.OK).json({ userinfo: { _id, name }, token })
}

module.exports = { User_Registration, User_Login }