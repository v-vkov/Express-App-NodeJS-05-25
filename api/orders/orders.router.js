const express = require('express');
const router = express.Router();
const ordersCtrl = require('./orders.ctrl');
const authMiddleware = require('../common/middlwares/auth');


router.get('/', authMiddleware.checkAuth, ordersCtrl.getOrders);
// router.get('/test', ordersCtrl.testOrders);
router.get('/:id', authMiddleware.checkAuth, ordersCtrl.getOrderById);
router.post('/', authMiddleware.checkAuth, ordersCtrl.createOrder);


module.exports = router;