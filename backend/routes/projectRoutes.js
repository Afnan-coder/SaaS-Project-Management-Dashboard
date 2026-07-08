import express from "express";
import {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
} from "../controllers/projectController.js";

import {verifyToken, verifyRole} from "../middlewares/authMiddleware.js";

const router = express.Router();


// Create Project
router.post(
    "/",
    verifyToken,
    verifyRole("super_admin", "manager"),
    createProject
);


// Get All Projects
router.get(
    "/",
    verifyToken,
    getAllProjects
);


// Get Single Project
router.get(
    "/:id",
    verifyToken,
    getProjectById
);


// Update Project
router.put(
    "/:id",
    verifyToken,
    verifyRole("super_admin", "manager"),
    updateProject
);


// Delete Project
router.delete(
    "/:id",
    verifyToken,
    verifyRole("super_admin"),
    deleteProject
);

export default router;