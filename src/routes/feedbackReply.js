import express from 'express';
import { createReply, getRepliesForLink } from '../controllers/feedbackReplyController.js';
import { protect } from '../middleware/auth.js';

// mergeParams: true lets this router access :linkId from the parent mount path
const router = express.Router({ mergeParams: true });

router.post('/replies', createReply);
router.get('/replies', protect, getRepliesForLink);

export default router;
