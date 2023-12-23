const mongoose = require('mongoose')

const user = mongoose.Schema({
    identity: {
        type: String,
        unique: true,
        required: [true, "Lütfen bir T.C. kimlik numarası giriniz"],
        maxLength: 11
    },
    name: {
        type: String,
        required: [true, "Lütfen bir isim giriniz"],
        maxLength: 100
    },
    surname: {
        type: String,
        required: [true, "Lütfen bir soyisim giriniz"],
        maxLength: 100
    },
    dob: {
        type: Date,
        required: [true, "Lütfen bir doğum tarihi giriniz"]
    },
    email: {
        unique: true,
        type: String,
        required: [true, "Lütfen bir e-posta adresi giriniz"]
    },
    tel: {
        unique: true,
        type: String,
        required: [true, "Lütfen bir telefon numarası giriniz"]
    },
    gender: {
        type: String,
        required: [true, "Lütfen bir cinsiyet belirtiniz"],
        enum: ["Erkek", "Kadin"]
    },
    role: {
        type: String,
        required: [true, "Lütfen bir rol belirtiniz"],
        enum: ["User", "Doctor", "Admin"]
    }
});

const userModel = mongoose.model('user', user)

module.exports = userModel;