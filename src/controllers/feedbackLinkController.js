import FeedbackLink from '../models/feedbackLink.js';
import { success, error } from '../utils/responseHandler.js';

// @desc    Create a new feedback link (inactive by default)
// @route   POST /api/v1/feedback-links
// @access  Private
export const createFeedbackLink = async (req, res) => {
    try {
        const { title, description, slug } = req.body;

        if (!title || !slug) {
            return error(res, 'Title and slug are required', 400);
        }

        const existing = await FeedbackLink.findOne({ slug });
        if (existing) {
            return error(res, 'Slug already exists', 400);
        }

        const link = await FeedbackLink.create({
            owner: req.user._id,
            title,
            description,
            slug,
            isActive: false, // inactive by default
        });

        res.status(201);
        return success(res, link, 'Feedback link created successfully');
    } catch (err) {
        return error(res, err.message, 500);
    }
};

// @desc    Get all active feedback links for the logged-in user
// @route   GET /api/v1/feedback-links/active
// @access  Private
export const getActiveLinks = async (req, res) => {
    try {
        const links = await FeedbackLink.find({ owner: req.user._id, isActive: true }).sort({ createdAt: -1 });
        return success(res, links, 'Active feedback links fetched');
    } catch (err) {
        return error(res, err.message, 500);
    }
};

// @desc    Get all inactive feedback links for the logged-in user
// @route   GET /api/v1/feedback-links/inactive
// @access  Private
export const getInactiveLinks = async (req, res) => {
    try {
        const links = await FeedbackLink.find({ owner: req.user._id, isActive: false }).sort({ createdAt: -1 });
        return success(res, links, 'Inactive feedback links fetched');
    } catch (err) {
        return error(res, err.message, 500);
    }
};

// @desc    Activate a feedback link
// @route   PATCH /api/v1/feedback-links/:id/activate
// @access  Private
export const activateLink = async (req, res) => {
    try {
        const link = await FeedbackLink.findOneAndUpdate(
            { _id: req.params.id, owner: req.user._id },
            { isActive: true },
            { new: true }
        );
        if (!link) {
            return error(res, 'Link not found', 404);
        }
        return success(res, link, 'Link activated successfully');
    } catch (err) {
        return error(res, err.message, 500);
    }
};

// @desc    Deactivate a feedback link
// @route   PATCH /api/v1/feedback-links/:id/deactivate
// @access  Private
export const deactivateLink = async (req, res) => {
    try {
        const link = await FeedbackLink.findOneAndUpdate(
            { _id: req.params.id, owner: req.user._id },
            { isActive: false },
            { new: true }
        );
        if (!link) {
            return error(res, 'Link not found', 404);
        }
        return success(res, link, 'Link deactivated successfully');
    } catch (err) {
        return error(res, err.message, 500);
    }
};

// @desc    Get a single feedback link by ID
// @route   GET /api/v1/feedback-links/:id
// @access  Private
export const getLinkById = async (req, res) => {
    try {
        const link = await FeedbackLink.findOne({ _id: req.params.id, owner: req.user._id });
        if (!link) {
            return error(res, 'Link not found', 404);
        }
        return success(res, link, 'Feedback link fetched');
    } catch (err) {
        return error(res, err.message, 500);
    }
};

// @desc    Get a single feedback link by slug (public — no token required)
// @route   GET /api/v1/feedback-links/slug/:slug
// @access  Public
export const getLinkBySlug = async (req, res) => {
    try {
        const { slug } = req.params;

        const link = await FeedbackLink.findOne({ slug });
        if (!link) {
            return error(res, 'Feedback link not found', 404);
        }

        return success(res, link, 'Feedback link fetched');
    } catch (err) {
        return error(res, err.message, 500);
    }
};
