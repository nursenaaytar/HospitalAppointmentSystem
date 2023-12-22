const mongoose = require('mongoose')

const major = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a major name"],
        maxLength: 100
    }
})

const majorModel = mongoose.model('major', major)

module.exports = majorModel;