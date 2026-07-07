import jwt from "jsonwebtoken"
import User from "../models/User.js"

export const verifyToken = async (req, res, next) => {
 
    const header = req.headers.authorization
    if (!header) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    const token = header.split(" ")[1]
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized" })
        }
        req.user = user
        next()
    })

}

export const verifyRole = (...allowedRoles) => {
    return (req, res, next) => {

        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "Forbidden" })
        }
        
        next()
    }
}