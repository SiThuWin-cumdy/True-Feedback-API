import express from 'express';
import {
    generateFeedbackSuggestions
} from '../controllers/feedbackSuggestionController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', generateFeedbackSuggestions); 

export default router;
