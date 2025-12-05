const { randomUUID } = require('crypto');
const crypto = require('crypto')

let products = [
    { id: 1, name: 'iPhone 15', price: 100, is_deleted: false },
    { id: 2, name: 'MacBook Pro', price: 200, is_deleted: false },
    { id: 3, name: 'iPad Pro', price: 300, is_deleted: true },
    { id: 4, name: 'Apple Watch', price: 400, is_deleted: false },
    { id: 5, name: 'AirPods', price: 500, is_deleted: false },
    { id: 6, name: 'Apple TV', price: 600, is_deleted: false },
    { id: 7, name: 'Apple Music', price: 700, is_deleted: false },
    { id: 8, name: 'Apple News', price: 800, is_deleted: false }
]


const getProducts = (req, res) => {
    const productId = crypto.randomBytes(32).toString('hex')
    console.log(productId)
    return res.status(200).json({ data: products.filter(product => !product.is_deleted) }); 
};

const getProductById = (req, res) => {
    const productId = req.params.id;
    const product = products.find(product => product.id.toString() === productId.toString());

    if (!product) {
       return res.status(404).json({ error: `Product with id ${productId} not found` });
    }

    return res.status(200).json({ data: product });
};

const createProduct = (req, res) => { 
    const newProduct = {
        id: randomUUID(),
        ...req.body
    }

    products.push(newProduct);

    return res.status(201).json({ data: newProduct });
};

const updateProduct = (req, res) => {
    const productId = req.params.id;
    const { price } = req.body;

    const product = products.find(product => product.id.toString() === productId.toString());

    if (!product) {
       return res.status(404).json({ error: `Product with id ${productId} not found` });
    }

    product.price = price;

    return res.status(200).json({ data: product });

};

const deleteProduct = (req, res) => {
    const productId = req.params.id;
    const product = products.find(product => product.id.toString() === productId.toString());

    if (!product) {
       return res.status(404).json({ error: `Product with id ${productId} not found` });
    }

    products = products.filter(product => product.id.toString() !== productId.toString());

    return res.status(200).json({ data: `Product with id ${productId} deleted` });
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};