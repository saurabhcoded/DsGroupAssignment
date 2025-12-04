const Task = require('../models/Task');
const { statusCodes } = require('../_constants/statusCodes');

const getTasks = async (req, res) => {
    try {
        const { status, priority, search, sortBy, order } = req.query;
        
        let query = {};
        
        if (req.user.role !== 'admin') {
            query.assignee = req.user._id;
        }

        if (status) query.status = status;
        if (priority) query.priority = priority;
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        let sortOptions = {};
        if (sortBy) {
            sortOptions[sortBy] = order === 'desc' ? -1 : 1;
        } else {
            sortOptions.createdAt = -1;
        }

        const tasks = await Task.find(query)
            .populate('assignee', 'name email')
            .populate('createdBy', 'name email')
            .sort(sortOptions);

        res.status(statusCodes.OK).json({ tasks });
    } catch (error) {
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
            .populate('assignee', 'name email')
            .populate('createdBy', 'name email');

        if (!task) {
            return res.status(statusCodes.NOT_FOUND).json({ message: 'Task not found' });
        }

        if (req.user.role !== 'admin' && task.assignee._id.toString() !== req.user._id.toString()) {
            return res.status(statusCodes.FORBIDDEN).json({ message: 'Access denied' });
        }

        res.status(statusCodes.OK).json({ task });
    } catch (error) {
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

const createTask = async (req, res) => {
    try {
        const { title, description, status, priority, assignee, dueDate } = req.body;

        const task = new Task({
            title,
            description,
            status,
            priority,
            assignee: assignee || req.user._id,
            createdBy: req.user._id,
            dueDate
        });

        await task.save();
        await task.populate('assignee', 'name email');
        await task.populate('createdBy', 'name email');

        res.status(statusCodes.CREATED).json({ task });
    } catch (error) {
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

const updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(statusCodes.NOT_FOUND).json({ message: 'Task not found' });
        }

        if (req.user.role !== 'admin' && task.assignee.toString() !== req.user._id.toString()) {
            return res.status(statusCodes.FORBIDDEN).json({ message: 'Access denied' });
        }

        const updates = req.body;
        
        if (updates.assignee && req.user.role !== 'admin') {
            return res.status(statusCodes.FORBIDDEN).json({ message: 'Only admin can reassign tasks' });
        }

        Object.keys(updates).forEach(key => {
            task[key] = updates[key];
        });

        await task.save();
        await task.populate('assignee', 'name email');
        await task.populate('createdBy', 'name email');

        res.status(statusCodes.OK).json({ task });
    } catch (error) {
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(statusCodes.NOT_FOUND).json({ message: 'Task not found' });
        }

        if (req.user.role !== 'admin' && task.createdBy.toString() !== req.user._id.toString()) {
            return res.status(statusCodes.FORBIDDEN).json({ message: 'Access denied' });
        }

        await Task.findByIdAndDelete(req.params.id);

        res.status(statusCodes.OK).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTask };

