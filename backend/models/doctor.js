const mongoose = require('mongoose')

const doctor = mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    majorId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'majors',
    },
    hospitalId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hospitals',
    }
})

const doctorModel = mongoose.model('doctor', doctor)

module.exports = doctorModel;