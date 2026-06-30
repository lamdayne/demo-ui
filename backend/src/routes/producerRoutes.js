import express from 'express';
import { getProducers, getProducerById, onboardProducer, getDashboardStats } from '../controllers/producerController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getProducers);
router.get('/dashboard/stats', protect, getDashboardStats);
router.get('/:id', getProducerById);
router.post('/onboard', protect, onboardProducer);

export default router;
