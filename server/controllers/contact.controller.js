const {Contact}= require('../models/contact.model')

module.exports.CreateMessage = (req, res) =>{
    const {userName, email, subject, message} = req.body
    Contact.create({
        userName, email, subject, message
    })
    .then(message=> res.json(message))
    .catch(err => res.json(err))

}

module.exports.getAllMessages = (req, res) => {
    Contact.find({})
        .then(messages => res.json(messages))
        .catch(err=> res.json(err))
}

module.exports.deleteAll = (req, res) =>{
    Contact.deleteMany({})
        .then(messages => res.json(messages))
        .catch(err=> res.json(err))
}