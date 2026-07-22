//There controller don't use the protected routes

import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import crypto from "crypto"
import nodemailer from "nodemailer"


//Register
export const register = async (req, res) => {

    const { username, email, password, role } = req.body
    if (!username || !email || !password) {
        return res.status(400).json({ message: "Please fill all the fields" })
    }

    const alreadyExist = await User.findOne({ email })

    if (alreadyExist) {
        return res.status(400).json({ message: "User already exist" })
    }

    try {

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new User({
            username,
            email,
            password: hashedPassword,
            role
        })

        await user.save()

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//Login controller
export const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Please fill all the fields" })
    }
    try {

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Password is incorrect" })
        }

        const accessToken = jwt.sign(
            { id: user._id, role: user.role },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        )

        const refreshToken = jwt.sign(
            { id: user._id, role: user.role },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '7d' }
        )

        //Store refresh token in cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })

        //send access token to client
        res.status(200).json({
            success: true,
            accessToken,
            message: "User logged in successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}


//Refresh Token controller
export const refreshToken = async (req, res) => {

    const token = req.cookies.refreshToken

    if (!token) {
        return res.status(401).json({ success: false, message: "No token provided" })
    }

    try {

        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)

        const user = await User.findById(decoded.id)

        if (!user) {
            return res.status(401).json({ success: false, message: "User not found" })
        }

        const newAccessToken = jwt.sign(
            { id: user._id, role: user.role },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        )

        res.status(200).json({
            success: true,
            accessToken: newAccessToken,
            message: "Access token refreshed successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }

}

//logout controller
export const logout = async (req, res) => {
    try {

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        res.status(200).json({ message: "Logged out successfully" });


    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

//Forget password
export const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body

        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" })
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ success: false, message: "If an account exists, a password reset email has been sent." })
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex')
        const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex')

        // Save token and expiry to database (valid for 15 minutes)
        user.resetPasswordToken = resetTokenHash
        user.resetPasswordExpiry = Date.now() + 15 * 60 * 1000
        await user.save()

        // Create reset URL
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`

        // Configure email service
        const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        })

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset Request',
            html: `
                <h2>Password Reset Request</h2>
                <p>Click the link below to reset your password:</p>
                <a href="${resetUrl}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                    Reset Password
                </a>
                <p>Or paste this link in your browser:</p>
                <p>${resetUrl}</p>
                <p>This link will expire in 15 minutes.</p>
                <p>If you didn't request this, please ignore this email.</p>
            `
        }

        await transporter.sendMail(mailOptions)

        res.status(200).json({
            success: true,
            message: "Password reset email sent successfully"
        })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

//Reset password
export const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body

        if (!token || !newPassword) {
            return res.status(400).json({ success: false, message: "Token and password are required" })
        }

        if (newPassword.length < 6) {
            return res.status(400).json({ success: false, message: "Password must be at least 6 characters" })
        }

        // Hash the token to match what's in database
        const resetTokenHash = crypto.createHash('sha256').update(token).digest('hex')

        // Find user with matching token and valid expiry
        const user = await User.findOne({
            resetPasswordToken: resetTokenHash,
            resetPasswordExpiry: { $gt: Date.now() }
        })

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired reset token" })
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10)

        // Update password and clear reset fields
        user.password = hashedPassword
        user.resetPasswordToken = null
        user.resetPasswordExpiry = null
        await user.save()

        res.status(200).json({
            success: true,
            message: "Password reset successfully"
        })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
