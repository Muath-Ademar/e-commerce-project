const { Order } = require('../models/order.model')
const { Product } = require('../models/product.model')

module.exports.createOrder = async (req, res) => {
    const { products, shippingAddress } = req.body
    const userId = req.user.id
    try {
        if (!Array.isArray(products) || products.length === 0) return res.status(400).json({ msg: "Products are required." });
        if (!shippingAddress) return res.status(400).json({ msg: "Shipping information are required" })

        let orderTotal = 0
        let orderProducts = []

        for (let item of products) {
            const { productId, productQuantity } = item
            if (!productQuantity || productQuantity < 1) {
                return res.status(400).json({ msg: 'Invalid quantity for product.' });
            }

            const product = await Product.findById(productId)
            if (!product) return res.status(404).json({ msg: `Product with id: ${productId} not found` })

            if (product.stock < productQuantity) return res.status(400).json({ msg: `not enough stock for ${product.productName}` })

            const priceAtPurchase = product.price
            orderTotal += priceAtPurchase * productQuantity

            orderProducts.push({
                productId,
                productQuantity,
                priceAtPurchase
            })

        }

        const newOrder = await Order.create({
            userId,
            products: orderProducts,
            shippingAddress,
            total: orderTotal,
        })


        res.status(201).json({ msg: "Order created successfully", order: newOrder })

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error creating order.', error: error.message });
    }
}
// later on add the payment and delivery statuses

module.exports.updateOrderForAdmin = async (req, res) => {

    try {
        const order = await Order.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        if (!order) return res.status(404).json({ msg: 'Order does not exist' })

        for (let item of order.products) {
            const { productId, productQuantity } = item
            if (!productQuantity || productQuantity < 1) return res.status(400).json({ msg: "Invalid quantity for product" })

            const product = await Product.findById(productId)
            if (!product) return res.status(404).json({ msg: `Product with id: ${productId} not found` })
            if (product.stock < productQuantity) return res.status(400).json({ msg: `not enough stock for ${product.productName}` })
            // but what if the admin by mistake changes the status to deliverd and paid? handle this the next time you log in
            if (order.deliveryStatus === 'delivered' && order.paymentStatus === 'paid') {
                order.stockStatus = true
                product.stock -= productQuantity
                await product.save()
            }
            else if (order.deliveryStatus !== 'delivered' && order.paymentStatus !== 'paid') {
                order.stockStatus = false
                product.stock += productQuantity
                await product.save()

            }
        }
        await order.save()

        res.status(200).json({ msg: "Status updated successfully", orderStatus: order })
    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: "Error updating Status", error: error.message })
    }
}

module.exports.updateOrderForUser = async (req, res) => {
    const userId = req.user.id
    try {
        const order = await Order.findOne({ _id: req.params.id })
        if (!order) return res.status(404).json({ msg: 'Order does not exist' })
        if (userId.toString() !== order.userId.toString()) return res.status(403).json({ msg: "this order does not belong to this user" })
        if (order.deliveryStatus === 'shipped' || order.deliveryStatus === 'delivered') {
            return res.status(409).json({ msg: "Order is Already on its way" })
        }
        let orderTotal = 0
        let orderProducts = []

        const orderItems = req.body.products

        if (!Array.isArray(orderItems)) return res.status(400).json({ msg: "Order Items is undefined" })
        for (let item of orderItems) {
            const { productId, productQuantity } = item
            const product = await Product.findById(productId)
            if (!product) return res.status(404).json({ msg: `Product with id: ${productId} not found` })
            if (productQuantity > product.stock) return res.status(400).json({ msg: `not enough stock for ${product.productName}` })
            const priceAtPurchase = product.price
            orderTotal += priceAtPurchase * productQuantity
            orderProducts.push({
                productId,
                productQuantity,
                priceAtPurchase
            })
        }

        order.products = orderProducts
        order.total = orderTotal

        await order.save()
        res.status(201).json({ msg: "Order updated successfully", order: order })
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error Updating order.', error: error.message });
    }
}

module.exports.getSpecificOrder = (req, res) => {
    Order.findById({ _id: req.params.id })
        .then(order => res.json(order))
        .catch(err => res.json(err))
}

module.exports.getAllOrders = (req, res) => {
    Order.find({})
        .then(orders => res.json(orders))
        .catch(err => res.json(err))
}

module.exports.getAllOrdersForOneUser = async (req, res) => {
    const userId = req.user.id
    try {
        const AllUserOrders = await Order.find({ userId: userId })
        if (AllUserOrders.length === 0) {
            return res.status(404).json({ msg: `This user does not have any orders` })
        }
        res.status(200).json({ msg: "Orders fetched successfully", orders: AllUserOrders })
    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: "Error in fetching User orders", error: error })
    }
}

module.exports.deleteAllOrders = async (req, res) => {
    const userId = req.user.id
    try {
        const AllUserOrders = await Order.find({ userId: userId })
        let orders = []
        for (let i = 0; i < AllUserOrders.length; i++) {
            if (AllUserOrders[i].deliveryStatus === 'shipped' || AllUserOrders[i].deliveryStatus === 'delivered') return res.status(409).json({ msg: "Cannot delete, some of the orders are already shipped or delivered." })
            else {
                orders.push(AllUserOrders[i])
            }
        }
        const orderIds = AllUserOrders.map(order => order._id);
        const deletedOrders = await Order.deleteMany({ _id: { $in: orderIds } });

        res.status(200).json({ msg: "orders deleted successfully", orders: deletedOrders })

    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: "Error in deleting orders", error: error.message })
    }
}

module.exports.deleteOrder = async (req, res) => {
    const order = await Order.findById({ _id: req.params.id })
    try {
        if (order.deliveryStatus === 'shipped' || order.deliveryStatus === 'delivered') {
            return res.status(409).json({ msg: "cannot cancel Order, its already on its way" })
        }
        const deletedOrder = await Order.deleteOne(order)
        res.status(200).json({ msg: "Order deleted successfully", order: deletedOrder })

    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: "Error in deleting order", error: error.message })
    }

}

// ideas that came up to me:
// 1-if you delete a user, does that mean that all their order info gets deleted? think about this next time.
// 2-also check out pagination, see what is it about.