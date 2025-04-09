const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    products: [
        {
            productId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            } ,

            productQuantity: {
                type: Number,
                required: true,
                min: 1
            },

            priceAtPurchase: {
                type: Number,
                required: true
            }
            
        }
        
    ],

    shippingAddress: {
        fullName: { type: String, required: true },
        addressLine: { type: String, required: true },
        city: { type: String, required: true }
    },

    total: {
        type: Number,
        required: true
    },

    deliveryStatus: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },

    paymentStatus: {
        type: String,
        enum: ['unpaid', 'paid'],
        default: 'unpaid'  
    },

    stockStatus: {
        type: Boolean,
        default: false
    },

    paidAt: {
        type: Date
    }
}, {timestamps: true})

module.exports.Order = mongoose.model('Order', OrderSchema)