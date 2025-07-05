import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';

import authRoutes from './routes/authRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import reminderRoutes from './routes/reminderRoutes.js';
import sosRoutes from './routes/sosRoutes.js';
import clinicRoutes from './routes/clinicRoutes.js';
import contentRoutes from './routes/contentRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import symptomRoutes from './routes/symptomRoutes.js';
import errorHandler from './middlewares/errorHandler.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(compression());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/reminders', reminderRoutes);
app.use('/api/sos', sosRoutes);
app.use('/api/clinics', clinicRoutes);
app.use('/api/contents', contentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/symptoms', symptomRoutes);

app.use(errorHandler);

// ❌ REMOVE app.listen() and PORT
export default app;
