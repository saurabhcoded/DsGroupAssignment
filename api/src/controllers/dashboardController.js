const Task = require('../models/Task');
const { statusCodes } = require('../_constants/statusCodes');

const getDashboard = async (req, res) => {
    try {
        const { status, priority, search, sortBy, order } = req.query;

        let query = { assignee: req.user._id };

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
            sortOptions.dueDate = 1;
        }

        const tasks = await Task.find(query)
            .populate('assignee', 'name email')
            .populate('createdBy', 'name email')
            .sort(sortOptions);

        const stats = {
            total: tasks.length,
            pending: tasks.filter(t => t.status === 'pending').length,
            inProgress: tasks.filter(t => t.status === 'in-progress').length,
            completed: tasks.filter(t => t.status === 'completed').length,
            highPriority: tasks.filter(t => t.priority === 'high').length
        };

        res.status(statusCodes.OK).json({ tasks, stats });
    } catch (error) {
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

module.exports = { getDashboard };

