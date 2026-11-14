import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import { error } from '../utils/responseHandler.js';

export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            if (!req.user) {
                return error(res, 'User not found', 401);
            }
            return next();
        } catch (err) {
            return error(res, 'Not authorized, token failed', 401);
        }
    }

    return error(res, 'Not authorized, no token', 401);
};
