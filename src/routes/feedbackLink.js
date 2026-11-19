import express from 'express';
import {
    createFeedbackLink,
    getActiveLinks,
    getInactiveLinks,
    activateLink,
    deactivateLink,
    getLinkById,
    getLinkBySlug,
} from '../controllers/feedbackLinkController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, createFeedbackLink);
router.get('/active', protect, getActiveLinks);
router.get('/inactive', protect, getInactiveLinks);
router.get('/slug/:slug', getLinkBySlug);
router.get('/:id', protect, getLinkById);
router.patch('/:id/activate', protect, activateLink);
router.patch('/:id/deactivate', protect, deactivateLink);

export default router;
