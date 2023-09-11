const express = require('express');
const { createUser, loginUserCtrl, getAllUser, getUserById, deleteUserById, updateUserById } = require('../controller/userCtrl');
const router = express.Router();
router.post('/register', createUser);
router.post('/login', loginUserCtrl);
router.get('/all-users', getAllUser);
router.get('/:id', getUserById);
router.delete('/:id', deleteUserById);
router.put('/:id', updateUserById);
module.exports = router