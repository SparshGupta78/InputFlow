const mongoose = require('mongoose')

const Form = mongoose.Schema(
    {
        formId: { type: String, required: true, unique: true },
        title: { type: String, required: true },
        description: { type: String },
        formData: { type: Array, required: true }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Form', Form, 'Form')