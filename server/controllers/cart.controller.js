const { Cart } = require('../models/cart.model')
const { Product } = require('../models/product.model')
module.exports.addToCart = async(req, res) =>{
    const{items} = req.body
    const userId = req.user.id
    try {
        if(!Array.isArray(items) || items.length === 0) return res.status(400).json({msg: "Products are required"})
        let productList = []
        
        for(let item of items){
            const {productId, quantity} = item

            if(!quantity || quantity < 1){
                return res.status(400).json({ msg: 'Invalid quantity for product.' });
            }

            const product = await Product.findById(productId)
            if (!product) return res.status(404).json({ msg: `Product with id: ${productId} not found` })
            
            if (product.stock < quantity) return res.status(400).json({ msg: `not enough stock for ${product.productName}` })
            productList.push({
                productId,
                quantity
            })
                }
            const newCart = await Cart.create({
                userId,
                items: productList
            })
            
            res.status(201).json({msg: "products added to cart successfully", cartItems: newCart})
        
    } catch (error) {
        console.error(error)
        res.status(500).json({msg: "Error in adding products to cart", error: error.message})
    }
}

module.exports.removeProductFromCart = async(req, res) =>{
    const userId = req.user.id
    const productId = req.params.id
    try {
        // Find the cart for the current user
        const cart = await Cart.findOne({userId: userId})
        if(!cart) return res.status(404).json({msg: "Cart cannot be found"})
        // Check if the product exists in the items array
        const itemIndex = cart.items.findIndex(item=> item.productId.toString()=== productId)
        if(itemIndex === -1) return res.status(404).json({msg: "Product cannot be found"})
        //remove it

        cart.items.splice(itemIndex, 1)

        //save the updated cart
        await cart.save()

        res.status(200).json({ msg: 'Product removed from cart', updatedCart: cart })
    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: 'Error in removing product from cart', error: error.message })
    }
}

module.exports.updateSingleProductInCart = async (req, res) => {
    const userId = req.user.id;

    try {
        const { quantity } = req.body;
        const productId = req.params.id

        if (!productId || !quantity || quantity < 1) {
            return res.status(400).json({ msg: "Invalid productId or quantity" });
        }

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ msg: `Product with id: ${productId} not found` });

        if (product.stock < quantity) {
            return res.status(400).json({ msg: `Not enough stock for ${product.productName}` });
        }

        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ msg: "Cart not found" });

        // Find the product in the cart
        const existingItem = cart.items.find(item => item.productId.toString() === productId);

        if (existingItem) {
            // If product exists in cart, update its quantity
            existingItem.quantity = quantity;
        } else {
            // If not, push it into the cart
            cart.items.push({ productId, quantity });
        }

        await cart.save();

        res.status(200).json({ msg: "Cart updated successfully", cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error updating product in cart", error: error.message });
    }
};


module.exports.getUserCart = async(req, res) =>{
    const userId = req.user.id
    try {
        const cart = await Cart.findOne({userId: userId})
        if(!cart) return res.status(404).json({msg: "Cart cannot be found"})
        
        res.status(200).json({msg: "Cart successfully found", cart: cart})
        
    } catch (error) {
        console.error(error)
        res.status(500).json({msg: "Error in fetching cart ", error: error.message})
    }
}