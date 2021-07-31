const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    age: String,
    role: {
        type: String,
        default: 'ADMIN'
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    enabled: {
        type: Boolean,
        default: true
    },
    address: String,
    gender: String,
    phone: String,
    email: String,
    avatar: String
})

module.exports = mongoose.model('User' ,UserSchema)