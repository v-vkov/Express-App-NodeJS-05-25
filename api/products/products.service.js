const ProductsModel = require('../../models/products');

const getProductsList = async (query= null) => {
    const products = await ProductsModel.find({isActive: true, ...query});

    return products;
}

const getProductById = async (productId) => {
    const product = await ProductsModel.findById(productId);

    if (!product) {
        throw new Error(`Product with id ${productId} not found`);
    }

    if (!product.isActive) {
        throw new Error(`Product with id ${productId} is not active`);
    }

    return product;
}

const createProduct = async (productData) => {
    const newProduct = await ProductsModel.create(productData);

    return newProduct;
}

const updateProduct = async (productId, productData) => {
    const product = await ProductsModel.findByIdAndUpdate(productId, {$set: productData}, {new: true});

    return product;
}

const deleteProduct = (productId) => {
    return ProductsModel.findByIdAndDelete(productId);
}

const testUpdateMethods = async (productId, productData) => {
    const product = await ProductsModel.findByIdAndUpdate(productId, {
        $addToSet: {categories: 'electronics'} 
    }, {new: true});

    // $set: {price: 200}
    // $unset: {price: 1}
    // $addToSet: {categories: 'electronics'} 
    // $pull: {categories: 'electronics'} 
    // $push: {categories: 'clothing'} 

    return product;
}

module.exports = {
    getProductsList,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    testUpdateMethods
}