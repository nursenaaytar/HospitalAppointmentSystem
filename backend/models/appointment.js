const mongoose = require('mongoose')

const appointment = mongoose.Schema({
    doctorId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'doctor',
    },
    patientId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    time: {
        type: Date,
        required: [true, "Please enter a appointment time"]
    },
    between: {
        type: String,
        required: [true, "Please enter a appointment beetween"]
    },
    note: {
        type: String,
    },
    isFull: {
        type: Boolean,
    },
    isCancalled: {
        type: Boolean,
    },
})

const appointmentModel = mongoose.model('appointment', appointment)

module.exports = appointmentModel;