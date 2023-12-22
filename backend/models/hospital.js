const mongoose = require('mongoose')

const hospital = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a hospital name"],
        maxLength: 100
    }
})

const hospitalModel = mongoose.model('hospital', hospital)

module.exports = hospitalModel;