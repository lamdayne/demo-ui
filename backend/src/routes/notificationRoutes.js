import express from 'express';
import { getNotifications, markAsRead } from '../controllers/notificationController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(protect); // All notification routes require authentication

router.get('/', getNotifications);
router.put('/:id/read', markAsRead);

export default router;
