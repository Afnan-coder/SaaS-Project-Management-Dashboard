import express from 'express';
import { getAllUsers, getProfile, updateUserRole } from '../controllers/userController.js';
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
export default router;