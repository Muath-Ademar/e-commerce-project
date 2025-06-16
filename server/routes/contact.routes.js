const ContactController = require('../controllers/contact.controller')
const { isAdmin } = require("../config/admin.middleware")
const { authenticate } = require('../config/jwt.config')
module.exports = function(app){
    app.post('/api/messages', ContactController.CreateMessage)
    app.get('/api/messages', authenticate, isAdmin, ContactController.getAllMessages)
    app.delete('/api/messages/delete', authenticate, isAdmin, ContactController.deleteAll)
}