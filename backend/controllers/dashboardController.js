import Project from "../models/Project.js";
import Task from "../models/Task.js";

// Get Dashboard Statistics
export const getDashboardStats = async (req, res) => {
    try {

        const totalProjects = await Project.countDocuments();

        const activeProjects = await Project.countDocuments({
            status: "In Progress",
        });

        const totalTasks = await Task.countDocuments();

        const pendingTasks = await Task.countDocuments({
            status: "Todo",
        });

        const completedTasks = await Task.countDocuments({
            status: "Completed",
        });

        return res.status(200).json({
            success: true,
            data: {
                totalProjects,
                activeProjects,
                totalTasks,
                pendingTasks,
                completedTasks,
            },
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Failed to fetch dashboard statistics",
            error: error.message,
        });

    }
};