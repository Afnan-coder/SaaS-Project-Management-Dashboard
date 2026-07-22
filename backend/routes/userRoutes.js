import express from 'express';
import { getAllUsers, getProfile, updateUserRole, deleteUser } from '../controllers/userController.js';
import { verifyToken, verifyRole } from '../middlewares/authMiddleware.js';


const router = express.Router()

router.get('/profile', verifyToken, getProfile);
router.get('/users', verifyToken, verifyRole("super_admin", "manager"), getAllUsers);
router.put(
    "/users/:id/role",
    verifyToken,
    verifyRole("super_admin"),
    updateUserRole
);

router.delete(
    "/users/:id",
    verifyToken,
    verifyRole("super_admin"),
    deleteUser
);

export default router;