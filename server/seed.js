const mongoose = require('mongoose');
require('dotenv').config();

const { Product } = require('./models/product.model');

const username = process.env.ATLAS_USERNAME;
const pw = process.env.ATLAS_PASSWORD;
const dbName = process.env.DB;
const uri = `mongodb+srv://${username}:${pw}@cluster0.4bylq0p.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;

const u = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=80`;

const products = [
    {
        productName: 'Classic White Tee',
        description: 'A timeless everyday white t-shirt made from 100% breathable cotton. Perfect for workouts or casual wear.',
        category: 'T-Shirts',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['White', 'Black', 'Gray'],
        price: 24.99,
        images: [u('UatufxA456E'), u('6qr9wg5tzPY')],
        stock: 100,
    },
    {
        productName: 'Performance Dry-Fit Tee',
        description: 'Moisture-wicking dry-fit t-shirt designed for high-intensity training. Keeps you cool and dry.',
        category: 'T-Shirts',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Blue', 'Black', 'Red'],
        price: 34.99,
        images: [u('6qr9wg5tzPY'), u('UatufxA456E')],
        stock: 80,
    },
    {
        productName: 'Fleece Pullover Hoodie',
        description: 'Cozy fleece hoodie with kangaroo pocket. Ideal for post-workout warmth or casual outings.',
        category: 'Hoodies',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Gray', 'Navy', 'Black'],
        price: 59.99,
        images: [u('MQm1JPi0kVA'), u('tPZSpcr8m7E')],
        stock: 60,
    },
    {
        productName: 'Zip-Up Training Hoodie',
        description: 'Lightweight zip-up hoodie with breathable fabric. Great for layering during outdoor workouts.',
        category: 'Hoodies',
        sizes: ['M', 'L', 'XL'],
        colors: ['Black', 'Olive'],
        price: 64.99,
        images: [u('tPZSpcr8m7E'), u('MQm1JPi0kVA')],
        stock: 45,
    },
    {
        productName: 'Pro Running Shorts',
        description: '5-inch inseam running shorts with built-in liner and side pockets. Lightweight and fast-drying.',
        category: 'Shorts',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'Navy', 'Red'],
        price: 29.99,
        images: [u('SQvRd2EVqLM'), u('yNOdyUObPfQ')],
        stock: 90,
    },
    {
        productName: 'Training Shorts',
        description: 'Versatile 7-inch training shorts with elastic waistband and zip pocket. Perfect for gym sessions.',
        category: 'Shorts',
        sizes: ['S', 'M', 'L'],
        colors: ['Gray', 'Black'],
        price: 27.99,
        images: [u('yNOdyUObPfQ'), u('SQvRd2EVqLM')],
        stock: 70,
    },
    {
        productName: 'Air Mesh Running Shoes',
        description: 'Lightweight mesh running shoes with responsive cushioning. Built for speed and comfort on any surface.',
        category: 'Shoes',
        sizes: ['40', '41', '42', '43', '44', '45'],
        colors: ['White', 'Black', 'Blue'],
        price: 89.99,
        images: [u('Ce61h5obKHw'), u('rPOPGZbP5Sc')],
        stock: 50,
    },
    {
        productName: 'Cross-Training Shoes',
        description: 'Durable cross-training shoes with lateral support and flat sole for weightlifting and HIIT.',
        category: 'Shoes',
        sizes: ['40', '41', '42', '43', '44'],
        colors: ['Black', 'Gray'],
        price: 79.99,
        images: [u('rPOPGZbP5Sc'), u('Ce61h5obKHw')],
        stock: 40,
    },
    {
        productName: 'Full Tracksuit Set',
        description: 'Matching jacket and jogger set in soft polyester. Stylish for travel, warm-ups, or casual wear.',
        category: 'Tracksuits',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'Navy', 'Burgundy'],
        price: 99.99,
        images: [u('jOzdECenFvE'), u('L_URHKedxEg')],
        stock: 35,
    },
    {
        productName: 'Slim Fit Tracksuit',
        description: 'Slim-cut tracksuit with moisture-wicking fabric. Designed for athletes who want style and function.',
        category: 'Tracksuits',
        sizes: ['M', 'L', 'XL'],
        colors: ['Gray', 'Black'],
        price: 109.99,
        images: [u('L_URHKedxEg'), u('jOzdECenFvE')],
        stock: 30,
    },
    {
        productName: 'Windbreaker Jacket',
        description: 'Lightweight windbreaker with water-resistant coating. Packable design for on-the-go athletes.',
        category: 'Jackets',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'Orange', 'Blue'],
        price: 74.99,
        images: [u('4LJ4qUF01GI'), u('9GBwZrbT0QU')],
        stock: 40,
    },
    {
        productName: 'Insulated Puffer Jacket',
        description: 'Warm insulated jacket for cold weather training. Keeps heat in without adding bulk.',
        category: 'Jackets',
        sizes: ['M', 'L', 'XL', 'XXL'],
        colors: ['Black', 'Olive'],
        price: 119.99,
        images: [u('9GBwZrbT0QU'), u('4LJ4qUF01GI')],
        stock: 25,
    },
    {
        productName: 'High-Impact Sports Bra',
        description: 'Maximum support sports bra for high-intensity workouts. Features moisture-wicking fabric and adjustable straps.',
        category: 'Sports Bras',
        sizes: ['XS', 'S', 'M', 'L'],
        colors: ['Black', 'Pink', 'White'],
        price: 39.99,
        images: [u('zSOu8Yq7VBg'), u('ki8UrRJP-7s')],
        stock: 60,
    },
    {
        productName: 'Strappy Training Bra',
        description: 'Medium support strappy sports bra with stylish back design. Great for yoga and pilates.',
        category: 'Sports Bras',
        sizes: ['XS', 'S', 'M', 'L'],
        colors: ['Gray', 'Teal', 'Black'],
        price: 34.99,
        images: [u('ki8UrRJP-7s'), u('zSOu8Yq7VBg')],
        stock: 55,
    },
    {
        productName: 'High-Waist Compression Leggings',
        description: '7/8 length compression leggings with high waistband. Offers full coverage and squat-proof fabric.',
        category: 'Leggings',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        colors: ['Black', 'Navy', 'Charcoal'],
        price: 49.99,
        images: [u('FeIxTBB1Iww'), u('saHd7qc-AMk')],
        stock: 75,
    },
    {
        productName: 'Printed Performance Leggings',
        description: 'Eye-catching printed leggings with four-way stretch and moisture management for studio or street.',
        category: 'Leggings',
        sizes: ['XS', 'S', 'M', 'L'],
        colors: ['Multicolor'],
        price: 54.99,
        images: [u('saHd7qc-AMk'), u('FeIxTBB1Iww')],
        stock: 50,
    },
    {
        productName: 'Cushioned Ankle Socks (3-Pack)',
        description: 'Arch-support ankle socks with cushioned sole. Keeps feet comfortable during long training sessions.',
        category: 'Socks',
        sizes: ['S', 'M', 'L'],
        colors: ['White', 'Black', 'Gray'],
        price: 14.99,
        images: [u('I45NPxRDLfU'), u('WMAPqWfkMSs')],
        stock: 150,
    },
    {
        productName: 'Compression Crew Socks',
        description: 'Graduated compression crew socks for improved circulation and reduced fatigue during runs.',
        category: 'Socks',
        sizes: ['M', 'L'],
        colors: ['Black', 'White'],
        price: 19.99,
        images: [u('WMAPqWfkMSs'), u('I45NPxRDLfU')],
        stock: 120,
    },
    {
        productName: 'Gym Duffel Bag',
        description: 'Spacious 40L duffel bag with shoe compartment and wet pocket. Built for the serious athlete.',
        category: 'Accessories',
        sizes: ['One Size'],
        colors: ['Black', 'Navy'],
        price: 44.99,
        images: [u('dfBa1wgTqKc'), u('XKimW0pke6w')],
        stock: 30,
    },
    {
        productName: 'Resistance Band Set',
        description: 'Set of 5 resistance bands with varying intensity levels. Perfect for strength training and rehab.',
        category: 'Accessories',
        sizes: ['One Size'],
        colors: ['Multicolor'],
        price: 24.99,
        images: [u('9IU6lNGUvHY'), u('c_koawAuY_M')],
        stock: 80,
    },
];

async function seed() {
    await mongoose.connect(uri);
    console.log('Connected to database');

    await Product.deleteMany({});
    console.log('Cleared existing products');

    await Product.insertMany(products);
    console.log(`Seeded ${products.length} products`);

    await mongoose.disconnect();
    console.log('Done');
}

seed().catch(err => {
    console.error(err);
    process.exit(1);
});
