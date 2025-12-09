const express = require('express');
const router = express.Router();
const productsCtrl = require('./products.ctrl');
const productsMiddlewares = require('./products.middlwares');
const authMiddleware = require('../common/middlwares/auth');


router.get('/', productsCtrl.getProducts);
router.get('/:id', productsCtrl.getProductById);
router.post('/', authMiddleware.checkAuth, productsMiddlewares.checkProductCreation, productsCtrl.createProduct);
router.put('/:id', authMiddleware.checkAuth, productsMiddlewares.checkProductUpdate, productsCtrl.updateProduct);
router.delete('/:id', authMiddleware.checkAuth, productsCtrl.deleteProduct);

module.exports = router;