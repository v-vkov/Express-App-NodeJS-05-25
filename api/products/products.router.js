const express = require('express');
const router = express.Router();
const productsCtrl = require('./products.ctrl');
const productsMiddlewares = require('./products.middlwares');


router.get('/', productsCtrl.getProducts);
router.get('/:id', productsCtrl.getProductById);
router.post('/', productsMiddlewares.checkProductCreation, productsCtrl.createProduct);
router.put('/:id', productsMiddlewares.checkProductUpdate, productsCtrl.updateProduct);
router.delete('/:id', productsCtrl.deleteProduct);

module.exports = router;