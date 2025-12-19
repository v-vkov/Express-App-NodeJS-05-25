const express = require('express');
const router = express.Router();
const usersCtrl = require('./users.ctrl');
const authMiddleware = require('../common/middlwares/auth');

router.get('/:id', authMiddleware.checkAuth, usersCtrl.getUserById);
router.put('/:id', authMiddleware.checkAuth, usersCtrl.updateUser);
router.delete('/:id', authMiddleware.checkAuth, usersCtrl.deleteUser);

router.post('/sign-up', usersCtrl.signUp);
router.post('/login', usersCtrl.login);
router.post('/logout', usersCtrl.logout);

module.exports = router;