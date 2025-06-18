const ProductController = require('../controllers/product.controller')
const {isAdmin} = require("../config/admin.middleware")
const { authenticate } = require('../config/jwt.config');
const upload = require('../config/upload')
module.exports = function(app){
    app.post('/api/products', upload.array('images',5), authenticate, isAdmin, ProductController.createProduct)
    app.get('/api/products',ProductController.getAllProducts)
    app.get('/api/products/filter',ProductController.filterProduct)
    app.get('/api/products/search', ProductController.searchProduct)
    app.get('/api/products/:id',ProductController.getSpecificProduct)
    app.delete('/api/products/delete', authenticate, isAdmin , ProductController.deleteAll)
    app.delete('/api/products/:id', authenticate, isAdmin, ProductController.deleteOneProduct)
}