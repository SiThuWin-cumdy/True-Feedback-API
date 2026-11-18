import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

dotenv.config();

const app = express();
app.use(express.json());

// CORS — allow the React frontend to call this API
const corsOrigin = process.env.CORS_ORIGIN || '*';
app.use(cors({ origin: corsOrigin, credentials: true }));

// Connect to DB
connectDB();

app.use('/api/v1/health', (await import('./routes/health.js')).default);
app.use('/api/v1/auth', (await import('./routes/auth.js')).default);
app.use('/api/v1/feedback-links', (await import('./routes/feedbackLink.js')).default);
app.use('/api/v1/feedback-links/:linkId', (await import('./routes/feedbackReply.js')).default);
app.use((await import('./middleware/notFound.js')).default);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`truefeedback-api listening on port ${port}`);
});
