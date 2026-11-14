import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import { success, error } from '../utils/responseHandler.js';

// @desc    Register a new user
// @route   POST /api/v1/auth/register
// @access  Public
export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return error(res, 'Please provide username, email and password', 400);
        }

        let user = await User.findOne({ $or: [{ email }, { username }] });
        if (user) {
            return error(res, 'Username or email already exists', 400);
        }

        user = await User.create({ username, email, password });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

        return success(res, { token, user: { id: user._id, username: user.username, email: user.email } }, 'User registered successfully');
    } catch (err) {
        return error(res, err.message, 500);
    }
};

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return error(res, 'Please provide email and password', 400);
        }

        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return error(res, 'Invalid credentials', 401);
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return error(res, 'Invalid credentials', 401);
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

        return success(res, { token, user: { id: user._id, username: user.username, email: user.email } }, 'Login successful');
    } catch (err) {
        return error(res, err.message, 500);
    }
};

// @desc    Get current logged-in user
// @route   GET /api/v1/auth/me
// @access  Private
export const me = async (req, res) => {
    try {
        return success(res, req.user, 'User profile fetched');
    } catch (err) {
        return error(res, err.message, 500);
    }
};
