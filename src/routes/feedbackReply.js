import express from 'express';
import { createReply, getRepliesForLink } from '../controllers/feedbackReplyController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/replies', createReply);
router.get('/replies', protect, getRepliesForLink);

export default router;
