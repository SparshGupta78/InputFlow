const mongoose = require('mongoose')

const Response = mongoose.Schema(
    {
        formId: { type: String, required: true },
        user: {type: String, required: true},
        responseData: {type: Object, required: true}
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Response', Response, 'Response')