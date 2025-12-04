const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { statusCodes } = require('../_constants/statusCodes');

const authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(statusCodes.UNAUTHORIZED).json({ message: 'Access denied. No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(statusCodes.UNAUTHORIZED).json({ message: 'Invalid token' });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(statusCodes.UNAUTHORIZED).json({ message: 'Invalid token' });
    }
};

const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(statusCodes.FORBIDDEN).json({ message: 'Access denied. Admin only' });
    }
    next();
};

module.exports = { authenticate, isAdmin };

