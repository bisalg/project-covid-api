const mongoose = require('mongoose')        //importing mongoose module

//setting up connetion to mongoDB using mongoose ODM

const ConnectionDB = (URI) => {
    return mongoose.connect(URI)
        .then(() => console.log('connected to mongoDB...'))
}

module.exports = ConnectionDB;