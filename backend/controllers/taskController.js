import Task from "../models/Task.js";

// Create Task
export const createTask = async (req, res) => {
    try {
        const {
            title,
            description,
            project,
            assignee,
            status,
            priority,
            dueDate,
            estimatedHours,
            attachments,
        } = req.body;

        const task = await Task.create({
            title,
            description,
            project,
            assignee,
            status,
            priority,
            dueDate,
            estimatedHours,
            attachments,
        });

        return res.status(201).json({
            success: true,
            message: "Task created successfully",
            data: task,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to create task",
            error: error.message,
        });
    }
};

// Get All Tasks
export const getAllTasks = async (req, res) => {
    try {

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const project = req.query.project;

        const skip = (page - 1) * limit;

        let filter = {};

        // If project id is provided, return only tasks of that project
        if (project) {
            filter.project = project;
        }

        const totalTasks = await Task.countDocuments(filter);

        const tasks = await Task.find(filter)
            .populate("project", "name")
            .populate("assignee", "username email role")
            .skip(skip)
            .limit(limit);

        return res.status(200).json({
            success: true,
            page,
            limit,
            totalTasks,
            totalPages: Math.ceil(totalTasks / limit),
            count: tasks.length,
            data: tasks,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch tasks",
            error: error.message,
        });
    }
};


// Get Single Task By ID
export const getTaskById = async (req, res) => {
    try {

        const task = await Task.findById(req.params.id)
            .populate("project", "name")
            .populate("assignee", "username email role");

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: task,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch task",
            error: error.message,
        });
    }
};

// Update Task
export const updateTask = async (req, res) => {
    try {

        const {
            title,
            description,
            project,
            assignee,
            status,
            priority,
            dueDate,
            estimatedHours,
            attachments,
        } = req.body;

        const task = await Task.findByIdAndUpdate(
            req.params.id,
            {
                title,
                description,
                project,
                assignee,
                status,
                priority,
                dueDate,
                estimatedHours,
                attachments,
            },
            {
                new: true,
                runValidators: true,
            }
        )
            .populate("project", "name")
            .populate("assignee", "username email role");

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Task updated successfully",
            data: task,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to update task",
            error: error.message,
        });
    }
};

// Delete a task
export const deleteTask = async (req, res) => {

};