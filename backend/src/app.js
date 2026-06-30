import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import producerRoutes from './routes/producerRoutes.js';
import traceabilityRoutes from './routes/traceabilityRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import wishlistRoutes from './routes/wishlistRoutes.js';
import supportRoutes from './routes/supportRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';

const app = express();

// Middlewares
app.use(cors({
  origin: '*', // Allows requests from any origin for development deployment
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root Health Route
app.get('/', (req, res) => {
  res.json({
    status: 'Healthy',
    name: 'Green Trace REST API',
    version: '1.0.0',
    timestamp: new Date()
  });
});

// Register API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/producers', producerRoutes);
app.use('/api/traceability', traceabilityRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/support', supportRoutes);
app.use('/api/notifications', notificationRoutes);

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.originalUrl}` });
});

// General Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

export default app;
