import express from "express";

import {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
} from "../controllers/taskController.js";

import {verifyToken, verifyRole} from "../middlewares/authMiddleware.js";

const router = express.Router();

// Create Task
router.post(
    "/",
    verifyToken,
    verifyRole("super_admin", "manager"),
    createTask
);

// Get All Tasks
router.get(
    "/",
    verifyToken,
    getAllTasks
);

// Get Single Task
router.get(
    "/:id",
    verifyToken,
    getTaskById
);

// Update Task
router.put(
    "/:id",
    verifyToken,
    verifyRole("super_admin", "manager"),
    updateTask
);

// Delete Task
router.delete(
    "/:id",
    verifyToken,
    verifyRole("super_admin"),
    deleteTask
);

export default router;