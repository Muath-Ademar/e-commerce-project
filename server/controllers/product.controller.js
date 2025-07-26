const { Product } = require('../models/product.model')


module.exports.createProduct = async (req, res) => {
    try {
        const { productName, category, price, sizes, colors, description, stock } = req.body;
        

        
        const imagePaths = Array.isArray(req.files) ? req.files.map(file => file.path.replace(/\\/g, '/')) : [];


        if(!productName || !category || !price || sizes.length == 0 || colors.length == 0 || !description || !stock || imagePaths.length ==0)
        {
            return res.status(400).json({ msg: "All fields are required" });
        }

        const newProduct = await Product.create({
            productName, 
            category, 
            sizes, 
            colors, 
            price, 
            images: imagePaths, 
            description, 
            stock
        });

        res.status(201).json({ msg: "Product created successfully", product: newProduct });
    } catch (error) {
        res.status(500).json({ msg: "Error creating product", error: error.message });
    }
};
module.exports.getAllProducts = (req, res) => {
    Product.find({})
        .then(products => {
            res.json(products)
        })
        .catch(err => res.json(err))
}

module.exports.getSpecificProduct = (req, res) => {

    Product.findOne({ _id: req.params.id })
        .then(product => res.json(product))
        .catch(error => res.json(error))
}

module.exports.deleteOneProduct = (req, res) => {
    Product.deleteOne({ _id: req.params.id })
        .then(product => res.json(product))
        .catch(error => res.json(error))
}
module.exports.deleteAll = (req, res) => {
    Product.deleteMany({})
        .then(res.json({ msg: "Products deleted successfully." }))
        .catch(res.status(500).json({ msg: "Error in deleting products" }))
}

module.exports.filterProduct = async (req, res) => {
    const { category, colors, sizes, minPrice, maxPrice } = req.query;
    try {
        let query = {}
        if (category) query.category = category.trim()
        if (minPrice && maxPrice) query.price = { $gte: minPrice, $lte: maxPrice }
        if (colors) {
            let colorsArray = colors.split(",").map(c => c.charAt(0).toUpperCase() + c.slice(1).toLowerCase().trim())
            query.colors = { $in: colorsArray }
        }
        if (sizes) {
            let sizesArray = sizes.split(",").map(s => s.trim())
            query.sizes = { $in: sizesArray }
        }
        const filteredProduct = await Product.find(query)
        res.status(200).json(filteredProduct)
    } catch (error) {
        res.status(500).json({ msg: "Error in filtering the product", error: error.message })
    }
}

module.exports.searchProduct = async (req, res) => {
    const query = req.query.key


    try {
        const products = await Product.find({
            $or: [
                { productName: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } }, // whole word match
                { category: { $regex: query, $options: 'i' } },
                // { description: { $regex: `\\b${query}\\b`, $options: 'i' } }, // whole word match
                // work on adding the colors and sizes array later
            ]
        }).select('-__v')

        if (products.length === 0) {
            return res.status(404).json({ msg: 'No products found' })
        }
        res.json(products)
    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: 'Server error' })
    }


}