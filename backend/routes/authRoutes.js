import { Router } from "express";
import express from "express";
import { login, logout, refreshToken, register, forgetPassword, resetPassword } from "../controllers/authController.js";

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/refresh', refreshToken)
router.post('/logout', logout)
router.post('/forgot-password', forgetPassword)
router.post('/reset-password', resetPassword)


export default router