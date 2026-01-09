const express = require('express');
const router = express.Router();

const paymentsCtrl = require('./payments.ctrl');

router.post('/webhook', express.raw({type: 'application/json'}), paymentsCtrl.handleWebhook);

module.exports = router;