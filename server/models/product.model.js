const mongoose = require('mongoose')
const ProductSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, "Product Name is required"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        maxlength: 500
    },
    category: {
        type: String,
        required: [true, "Category is required"],
        enum: ['Shoes', 'T-Shirts', 'Shorts', 'Hoodies', 'Tracksuits', 'Jackets', 'Sports Bras', 'Leggings', 'Socks', 'Accessories']
    },
    sizes: {
        type: [String],
        required: [true, "Sizes are required"],
    },
    colors: {
        type: [String],
        required: [true, "Colors are required"],
    },
    price:{
        type: Number,
        required: [true, "Price is required"],
    },

    images: {
        type: [String],
        required: [true, "Images are required"],
    },

    stock: {
        type: Number,
        required: true,
    }


},{timestamps: true})



module.exports.Product = mongoose.model('Product', ProductSchema)