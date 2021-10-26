const mongoose = require('mongoose')
const Schema = mongoose.Schema
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

// code for email validation 
const validate = (email) => {
    var expression = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return expression.test(email)
}

const UserSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please provide your name']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email id'],
        validate: [validate, 'Please provide valid email address'],
        lowercase: true,
        unique: true        //email has to be unique, throws error.code 11000
    },
    password: {
        type: String,
        required: [true, 'Please set-up a password'],
        minlength: 6
    }
}, { timestamps: true })        //timestamps add createdAt and updatedAt in the document


//encrypting password before saving it in the database

UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

//generating token from _id, name and encrypting it with JWT_SECRET_KEY 

UserSchema.methods.getToken = function () {
    const { _id, name } = this
    const token = jwt.sign(
        { _id, name },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '30d' }
    )
    return token;
}

//comparing encrypted password , returns 'true' if matched or 'false' if not

UserSchema.methods.comparePassword = function (password) {
    const flag = bcrypt.compare(password, this.password)
    return flag;
}

module.exports = mongoose.model('user', UserSchema)