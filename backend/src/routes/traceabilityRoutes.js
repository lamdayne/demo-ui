import express from 'express';
import { getBatchById, createBatch } from '../controllers/traceabilityController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/:id', getBatchById);
router.post('/', protect, authorize('producer', 'admin'), createBatch);

export default router;
