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