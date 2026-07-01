import express from 'express';
import { 
  getAdminStats, 
  getUsers, 
  updateUserRole, 
  deleteUser, 
  getProducers, 
  verifyProducer, 
  getOrders, 
  updateOrderStatus, 
  getCoupons, 
  createCoupon, 
  deleteCoupon,
  validateCoupon
} from '../controllers/adminController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Coupon validation (available to logged in customers/producers/admins)
router.get('/coupons/validate/:code', protect, validateCoupon);

// Admin-only management endpoints
router.use(protect, authorize('admin'));

router.get('/stats', getAdminStats);
router.get('/users', getUsers);
router.put('/users/:id/role', updateUserRole);
router.delete('/users/:id', deleteUser);

router.get('/producers', getProducers);
router.put('/producers/:id/verify', verifyProducer);

router.get('/orders', getOrders);
router.put('/orders/:id/status', updateOrderStatus);

router.get('/coupons', getCoupons);
router.post('/coupons', createCoupon);
router.delete('/coupons/:id', deleteCoupon);

export default router;
