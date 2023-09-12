const express = require('express');
const {
    createUser,
    loginUserCtrl,
    getAllUser,
    getUserById,
    deleteUserById,
    updateUserById,
    blockUser,
    unblockUser,
    handleRefreshToken,
    logout
} = require('../controller/userCtrl');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();
router.post('/register', createUser);
router.post('/login', loginUserCtrl);
router.get('/all-users', getAllUser);
router.get('/refresh', handleRefreshToken);
router.get('/logout', logout);
router.get('/:id', authMiddleware, isAdmin, getUserById);
router.delete('/:id', deleteUserById);
router.put('/edit-user', authMiddleware, updateUserById);
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser);
router.put('/unblock-user/:id', authMiddleware, isAdmin, unblockUser);

module.exports = router