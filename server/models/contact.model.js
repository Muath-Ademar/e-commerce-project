const mongoose = require('mongoose')
const ContactSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "User Name is required ."],    
    },
    email: {
        type: String,
        required: [true, "Email is required ."],
    },
    subject: {
        type: String,
        required: [true, "Subject is required ."],
    
    },

    message: {
        type: String,
        required: [true, "Message is required ."],
    }
})

module.exports.Contact = mongoose.model('Contact', ContactSchema)