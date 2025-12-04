const User = require('../models/User');
const { statusCodes } = require('../_constants/statusCodes');

const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(statusCodes.OK).json({ users });
    } catch (error) {
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(statusCodes.NOT_FOUND).json({ message: 'User not found' });
        }
        res.status(statusCodes.OK).json({ user });
    } catch (error) {
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(statusCodes.BAD_REQUEST).json({ message: 'Email already registered' });
        }

        const user = new User({ name, email, password, role });
        await user.save();

        res.status(statusCodes.CREATED).json({ user });
    } catch (error) {
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const { name, email, role } = req.body;
        
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(statusCodes.NOT_FOUND).json({ message: 'User not found' });
        }

        if (name) user.name = name;
        if (email) user.email = email;
        if (role) user.role = role;

        await user.save();
        res.status(statusCodes.OK).json({ user });
    } catch (error) {
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(statusCodes.NOT_FOUND).json({ message: 'User not found' });
        }
        res.status(statusCodes.OK).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };

