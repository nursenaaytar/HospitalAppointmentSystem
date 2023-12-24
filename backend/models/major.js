const mongoose = require('mongoose')

const major = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Lütfen ana bilim dalı adı giriniz"],
        maxLength: 100,
        unique: true
    }
})

const majorModel = mongoose.model('major', major)

module.exports = majorModel;