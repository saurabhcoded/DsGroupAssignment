const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { statusCodes } = require('../_constants/statusCodes');

const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(statusCodes.BAD_REQUEST).json({ message: 'Email already registered' });
        }

        const user = new User({ name, email, password, role: role || 'user' });
        await user.save();

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRATION || '7d'
        });

        res.status(statusCodes.CREATED).json({ user, token });
    } catch (error) {
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(statusCodes.UNAUTHORIZED).json({ message: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(statusCodes.UNAUTHORIZED).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRATION || '7d'
        });

        res.status(statusCodes.OK).json({ user, token });
    } catch (error) {
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

const logout = async (req, res) => {
    res.status(statusCodes.OK).json({ message: 'Logged out successfully' });
};

const getProfile = async (req, res) => {
    res.status(statusCodes.OK).json({ user: req.user });
};

module.exports = { register, login, logout, getProfile };

