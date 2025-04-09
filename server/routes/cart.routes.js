const CartController = require('../controllers/cart.controller')
const { authenticate } = require('../config/jwt.config')

module.exports = function(app){
    app.post('/api/cart/add', authenticate, CartController.addToCart)
    app.delete('/api/cart/remove/:id', authenticate, CartController.removeProductFromCart)
    app.patch('/api/cart/update/:id', authenticate, CartController.updateSingleProductInCart)
    app.get('/api/cart/:id', authenticate, CartController.getUserCart)
}