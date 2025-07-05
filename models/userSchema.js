const mongoose = require('mongoose')

const User = mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String},
    phoneNo: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    createdForm: [{type: String, required: true}],
    publishedForm: [{type: String, required: true}]
})

module.exports = mongoose.model('User', User, 'User')