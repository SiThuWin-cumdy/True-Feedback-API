import express from 'express';
import { createReply } from '../controllers/feedbackReplyController.js';

const router = express.Router();

router.post('/replies', createReply);

export default router;
