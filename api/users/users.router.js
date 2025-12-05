const express = require('express');
const router = express.Router();
const usersCtrl = require('./users.ctrl');


router.get('/', usersCtrl.getUsers);
router.get('/:id', usersCtrl.getUserById);
router.get('/:id/books', usersCtrl.getUserBooks);
router.post('/', usersCtrl.createUser);
router.put('/:id', usersCtrl.updateUser);
router.delete('/:id', usersCtrl.deleteUser);

module.exports = router;