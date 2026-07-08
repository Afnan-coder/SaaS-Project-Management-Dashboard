
// Create a new project
import Project from '../models/Project.js';

// Create Project
export const createProject = async (req, res) => {
    try {
        const {
            name,
            description,
            status,
            priority,
            deadline,
            client,
            teamMembers,
            progress,
        } = req.body;

        // Create new project
        const project = await Project.create({
            name,
            description,
            status,
            priority,
            deadline,
            client,
            teamMembers,
            progress,
            createdBy: req.user.id,
        });

        return res.status(201).json({
            success: true,
            message: "Project created successfully",
            data: project,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to create project",
            error: error.message,
        });
    }
};


// Get All Projects
export const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find()
            .populate("client", "username email")
            .populate("teamMembers", "username email")
            .populate("createdBy", "username email role");

        return res.status(200).json({
            success: true,
            message: "Projects fetched successfully",
            count: projects.length,
            data: projects,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch projects",
            error: error.message,
        });
    }
};


// Get single project by id
export const getProjectById = async (req, res) => {};


// Update project
export const updateProject = async (req, res) => {};


// Delete project
export const deleteProject = async (req, res) => {};