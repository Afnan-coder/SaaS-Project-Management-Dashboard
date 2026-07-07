import express from 'express';
import { getAllUsers, getProfile } from '../controllers/userController.js';
import {verifyToken, verifyRole} from '../middlewares/authMiddleware.js';


const router = express.Router()

router.get('/profile', verifyToken, getProfile);
router.get('/users', verifyToken, verifyRole("super_admin", "manager") , getAllUsers);

export default router;