import User from "../models/User.js";


//  getProfile
export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching profile", error: error.message });
    }
};

// Get All Users
export const getAllUsers = async (req, res) => {

    try {

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const { search, role } = req.query;

        // Exclude the logged-in user
        let filter = {
            _id: {
                $ne: req.user.id,
            },
        };

        // Search by username or email
        if (search) {

            filter.$or = [

                {
                    username: {
                        $regex: search,
                        $options: "i",
                    },
                },

                {
                    email: {
                        $regex: search,
                        $options: "i",
                    },
                },

            ];

        }

        // Filter by role
        if (role) {

            filter.role = role;

        }

        const totalUsers = await User.countDocuments(filter);

        const users = await User.find(filter)
            .select("-password")
            .skip(skip)
            .limit(limit);

        return res.status(200).json({

            success: true,

            page,

            limit,

            totalPages: Math.ceil(totalUsers / limit),

            totalUsers,

            count: users.length,

            data: users,

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: "Failed to fetch users",

            error: error.message,

        });

    }

};

// Update User Role
export const updateUserRole = async (req, res) => {
    try {

        const { role } = req.body;

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        user.role = role;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "User role updated successfully",
            data: user,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Failed to update user role",
            error: error.message,
        });

    }
};

// delete user
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to delete user",
            error: error.message,
        });
    }
};