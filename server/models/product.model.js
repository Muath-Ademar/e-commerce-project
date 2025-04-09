const mongoose = require('mongoose')
const ProductSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 500
    },
    category: {
        type: String,
        required: true,
        enum: ['Shoes', 'T-Shirts', 'Shorts', 'Hoodies', 'Tracksuits', 'Jackets', 'Sports Bras', 'Leggings', 'Socks', 'Accessories']
    },
    sizes: {
        type: [String],
        required: true
    },
    colors: {
        type: [String],
        required: true
    },
    price:{
        type: Number,
        required: true
    },

    images: {
        type: [String],
        required: true
    },

    stock: {
        type: Number,
        required: true,
    }


},{timestamps: true})



module.exports.Product = mongoose.model('Product', ProductSchema)