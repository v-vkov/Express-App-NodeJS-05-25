const { randomUUID } = require('crypto');
const crypto = require('crypto')

let products = [
    { id: 1, name: "iPhone 15", price: 999, image: "https://www.apple.com/v/iphone/home/cg/images/overview/select/iphone_17pro__0s6piftg70ym_large.jpg" },
    { id: 2, name: "Samsung Galaxy S24", price: 899, image: "https://images.samsung.com/ua/smartphones/galaxy-s24/images/galaxy-s24-highlights-kv.jpg" },
    { id: 3, name: "Xiaomi 14 pro", price: 299, image: "https://i02.appmifile.com/mi-com-product/fly-birds/xiaomi-14t-pro/PC/1319.png" },
    { id: 4, name: "Google Pixel 8", price: 799, image: "https://www.google.com/pixel/images/pixel8/hero_kv.jpg" }
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