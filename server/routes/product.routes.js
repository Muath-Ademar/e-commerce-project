const ProductController = require('../controllers/product.controller')
const {isAdmin} = require("../config/admin.middleware")
const { authenticate } = require('../config/jwt.config');
module.exports = function(app){
    app.post('/api/products', authenticate, isAdmin, ProductController.createProduct)
    app.get('/api/products' , authenticate ,ProductController.getAllProducts)
    app.get('/api/products/filter', authenticate, ProductController.filterProduct)
    app.get('/api/products/search', authenticate, ProductController.searchProduct)
    app.get('/api/products/:id', authenticate,ProductController.getSpecificProduct)
    app.delete('/api/products/:id', authenticate, isAdmin, ProductController.deleteOneProduct)
    app.delete('/api/products/delete', authenticate, isAdmin , ProductController.deleteAll)
}