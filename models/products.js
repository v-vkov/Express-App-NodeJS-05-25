const mongoose = require('mongoose');

const CATEGORIES = [
    'electronics',
    'clothing',
    'books',
    'food',
    'furniture',
    'other'
];

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }, 
    categories: {
        type: [String],
        enum: CATEGORIES
    },
    description: {
        type: String,
        default: 'No description available'
    },
    stock: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true }); // createdAt updateAt


module.exports = mongoose.model('Product', productSchema, 'products');