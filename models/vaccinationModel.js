const mongoose = require('mongoose')
const Schema = mongoose.Schema

//returns date string

const MaxDate = () => {
    let year = new Date().getFullYear()
    let day = new Date().getDate()
    let month = new Date().getMonth() + 1
    const theDate = `${year}-${month}-${day}`
    return theDate;
}

const VaccinationSchema = new Schema({
    aadhaarNo: {
        type: Number,
        required: [true, 'Please provide your Aadhaar no.'],
        min: [100000000000, 'Aadhaar has to be a 12digit number'],
        max: [999999999999, 'Aadhaar has to be a 12digit number'],
        unique: true            //aadhaar has to be unique, so set unique property 'true'
    },

    firstDose: {
        type: Boolean,
        required: [true, 'Please provide first dose info']
    },

    secondDose: {
        type: Boolean,
        default: false
    },

    vaccinationStatus: {                //will automatically get evaluated in controller logics,
        type: String,                   // user doesn't have to enter it manually
        default: 'not vaccinated'
    },

    location: {                        //allowed location are only gujrat and maharashtra
        type: String,                  //throws validation error
        lowercase: true,
        required: [true, 'Please provide your location'],
        enum: { values: ['gujrat', 'maharashtra'], message: 'Only for users of gujrat and maharashtra' }
    },

    vaccinationDate: {
        type: Date,
        min: ['2021-01-01', 'min date allowed:2021-01-01'],   // min date could be when vaccination drive started...
        max: [MaxDate(), 'max date allowed:Today\'s Date']    // max date can only be the date of updation of info
    },

    uploaderId: {                       // id of the registered user who is uploading the data..
        type: mongoose.Types.ObjectId,
        ref: 'User_Model'
    },

    uploader_IpAddress: {               //IP Address of the one who is uploading the data
        type: String                    //IPV4 for localhost will show 127.0.0.1
    }                                   //IPV6 for localhost will show ::1
}, { timestamps: true })


module.exports = mongoose.model('vaccinated_persons', VaccinationSchema)