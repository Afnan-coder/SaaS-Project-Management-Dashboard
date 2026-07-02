//There controller don't use the protected routes

import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


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
export const logout = (req, res) => {
    
}