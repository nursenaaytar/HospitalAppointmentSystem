const mongoose = require('mongoose')

const hospital = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Lütfen hastane adı giriniz"],
        maxLength: 100,
        unique: true,
    }
})

const hospitalModel = mongoose.model('hospital', hospital)

module.exports = hospitalModel;