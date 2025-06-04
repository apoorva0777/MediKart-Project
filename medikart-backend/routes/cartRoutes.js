const express = require('express');
const router = express.Router();
const { getCart, addToCart, updateCartItem, clearCart } = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getCart);
router.post('/add', protect, addToCart);
router.put('/update', protect, updateCartItem);
router.delete('/clear', protect, clearCart);

module.exports = router;
