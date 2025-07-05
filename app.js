import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// Routes
import authRoutes from './routes/authRoutes.js';
import clinicRoutes from './routes/clinicRoutes.js';
import contentRoutes from './routes/contentRoutes.js';
import symptomRoutes from './routes/symptomRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import sosRoutes from './routes/sosRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import reminderRoutes from './routes/reminderRoutes.js';

// Middlewares
import errorHandler from './middlewares/errorHandler.js';

dotenv.config();

const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Route Handlers
app.use('/api/auth', authRoutes);
app.use('/api/clinics', clinicRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/symptoms', symptomRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/sos', sosRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/reminders', reminderRoutes);

// Error handler
app.use(errorHandler);

export default app;
