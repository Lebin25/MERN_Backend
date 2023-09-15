const express = require("express");
const { 
    createProduct, 
    getProductById, 
    getAllProduct,
    updateProduct,
    deleteProduct,
    addToWishlish,
    rating,
} = require("../controller/productCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post('/', authMiddleware, isAdmin, createProduct);
router.get('/:id', getProductById);
router.put('/wishlist', authMiddleware, addToWishlish);
router.put('/rating', authMiddleware, rating);

router.put('/:id', authMiddleware, isAdmin, updateProduct);
router.delete('/:id', authMiddleware, isAdmin, deleteProduct);
router.get('/', getAllProduct);

module.exports = router;