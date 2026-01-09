const express = require('express');
const router = express.Router();

router.use('/payments', require('./payments/payments.router'));

module.exports = router;