import FeedbackLink from '../models/feedbackLink.js';
import FeedbackReply from '../models/feedbackReply.js';
import { success, error } from '../utils/responseHandler.js';

// @desc    Create a reply for a feedback link (only active links are replyable)
// @route   POST /api/v1/feedback-links/:linkId/replies
// @access  Public
export const createReply = async (req, res) => {
    try {
        const { linkId } = req.params;
        const { user: userId, message } = req.body;

        if (!message) {
            return error(res, 'Message is required', 400);
        }

        // Only allow replies on active links
        const link = await FeedbackLink.findById(linkId);
        if (!link) {
            return error(res, 'Feedback link not found', 404);
        }
        if (!link.isActive) {
            return error(res, 'This feedback link is not active and cannot receive replies', 403);
        }

        const reply = await FeedbackReply.create({
            feedbackLink: linkId,
            user: userId || null, // optional -> anonymous replies allowed
            message,
        });

        // Increment denormalized reply counter
        link.replyCount = (link.replyCount || 0) + 1;
        await link.save();

        res.status(201);
        return success(res, reply, 'Reply created successfully');
    } catch (err) {
        return error(res, err.message, 500);
    }
};
