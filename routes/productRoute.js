const express = require("express");
const {
    createProduct,
    getProductById,
    getAllProduct,
    updateProduct,
    deleteProduct,
    addToWishlish,
    rating,
    uploadImages,
    deleteImages,
} = require("../controller/productCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const { uploadPhoto, productImgResize } = require("../middlewares/uploadImages");
const router = express.Router();

router.post('/', authMiddleware, isAdmin, createProduct);
router.put('/upload', authMiddleware, isAdmin,
    uploadPhoto.array('images', 10), productImgResize, uploadImages)
router.get('/:id', getProductById);
router.put('/wishlist', authMiddleware, addToWishlish);
router.put('/rating', authMiddleware, rating);

router.put('/:id', authMiddleware, isAdmin, updateProduct);
router.delete('/:id', authMiddleware, isAdmin, deleteProduct);
router.delete('/delete-img/:id', authMiddleware, isAdmin, deleteImages);
router.get('/', getAllProduct);

module.exports = router;