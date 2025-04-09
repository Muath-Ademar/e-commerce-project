const OrderController = require('../controllers/order.controller')
const { authenticate } = require('../config/jwt.config')
const { isAdmin } = require('../config/admin.middleware')

module.exports = function(app){
    app.post('/api/orders', authenticate, OrderController.createOrder)
    app.get('/api/orders', authenticate, isAdmin, OrderController.getAllOrders)
    app.get('/api/orders/user', authenticate, OrderController.getAllOrdersForOneUser)
    app.get('/api/orders/:id', authenticate, OrderController.getSpecificOrder)
    app.delete('/api/orders/delete', authenticate, OrderController.deleteAllOrders)
    app.delete('/api/orders/delete/:id', authenticate, OrderController.deleteOrder)
    app.patch('/api/orders/:id/admin/update', authenticate, isAdmin, OrderController.updateOrderForAdmin)
    app.patch('/api/orders/:id/user/update', authenticate, OrderController.updateOrderForUser)
}