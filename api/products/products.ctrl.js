
const productsService = require('./products.service');

const getProducts = async (req, res) => {
    const products = await productsService.getProductsList(req.query);
    return res.status(200).json({ data: products }); 
};

const getProductById = async (req, res) => {
    const product = await productsService.getProductById(req.params.id);
    return res.status(200).json({ data: product });
};

const createProduct = async(req, res) => { 
    const newProduct = await productsService.createProduct(req.body);
    return res.status(201).json({ data: newProduct });
};

const updateProduct = async(req, res) => {
    const product = await productsService.updateProduct(req.params.id, req.body);
    if (!product) {
       return res.status(404).json({ error: `Product with id ${req.params.id} not found` });
    }

    return res.status(200).json({ data: product });
};

const deleteProduct = async (req, res) => {
    await productsService.deleteProduct(req.params.id);
    return res.status(200).json({ data: `Product with id ${req.params.id} deleted` });
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};