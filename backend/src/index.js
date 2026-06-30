import app from './app.js';
import { initDb } from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    console.log('Initializing database tables and checks...');
    await initDb();
    
    app.listen(PORT, () => {
      console.log(`Green Trace API Server running successfully on port ${PORT}`);
      console.log(`Target database URL: ${process.env.DATABASE_URL.split('@')[1] || 'Neon AWS'}`);
    });
  } catch (error) {
    console.error('Critical: Failed to start Green Trace Server:', error);
    process.exit(1);
  }
};

startServer();
