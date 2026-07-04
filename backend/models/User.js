import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    role : {type: String, enum: ['super_admin', 'manager', 'developer', 'user'], default: 'user'},
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpiry: { type: Date, default: null },
})

export default mongoose.model("User", userSchema)