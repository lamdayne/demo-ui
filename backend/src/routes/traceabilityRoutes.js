import express from 'express';
import { getBatchById, createBatch, getBatches, updateBatch, deleteBatch } from '../controllers/traceabilityController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getBatches);
router.get('/:id', getBatchById);
router.post('/', protect, authorize('producer', 'admin'), createBatch);
router.put('/:id', protect, authorize('producer', 'admin'), updateBatch);
router.delete('/:id', protect, authorize('producer', 'admin'), deleteBatch);

export default router;
