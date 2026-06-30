import express from 'express';
import { getProducts, getProductById, createProduct, deleteProduct } from '../controllers/productController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', protect, authorize('producer', 'admin'), createProduct);
router.delete('/:id', protect, authorize('producer', 'admin'), deleteProduct);

export default router;
