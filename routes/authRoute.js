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
    logout,
    updatePassword,
    forgotPasswordToken,
    resetPassword,
    loginAdmin,
    getWishlist,
    saveAddress,
} = require('../controller/userCtrl');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', createUser);
router.post('/forgot-password-token', forgotPasswordToken);
router.put('/reset-password/:token', resetPassword);

router.put('/password', authMiddleware, updatePassword);
router.post('/login', loginUserCtrl);
router.post('/admin-login', loginAdmin);
router.get('/all-users', getAllUser);
router.get('/refresh', handleRefreshToken);
router.get('/logout', logout);
router.get('/wishlist', authMiddleware, getWishlist);

router.delete('/:id', deleteUserById);
router.get('/:id', authMiddleware, isAdmin, getUserById);

router.put('/edit-user', authMiddleware, updateUserById);
router.put('/save-address', authMiddleware, saveAddress);
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser);
router.put('/unblock-user/:id', authMiddleware, isAdmin, unblockUser);

module.exports = router