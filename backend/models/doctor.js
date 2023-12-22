const mongoose = require('mongoose')

const doctor = mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    majorId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'major',
    },
    hospitalId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hospital',
    }
})

const doctorModel = mongoose.model('doctor', doctor)

module.exports = doctorModel;