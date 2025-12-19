const express = require('express');
const router = express.Router();
const ordersCtrl = require('./orders.ctrl');
const ordersMiddlewares = require('./orders.middlwares');
const authMiddleware = require('../common/middlwares/auth');


router.get('/', ordersCtrl.getOrders);
router.get('/:id', ordersCtrl.getOrderById);
router.post('/', authMiddleware.checkAuth, ordersCtrl.createOrder);

module.exports = router;