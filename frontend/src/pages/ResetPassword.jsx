import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { resetPassword } from "../services/resetPasswordService";
import { toast } from "react-toastify";

const ResetPassword = () => {

    const { token } = useParams();

    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await resetPassword(
                token,
                newPassword
            );

            toast.success(response.message);

            navigate("/login");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Something went wrong"
            );

        }

    };

    return (

        <div className="flex justify-center items-center min-h-screen">

            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
            >

                <h1 className="text-2xl font-bold mb-6 text-center">

                    Reset Password

                </h1>

                <input
                    type="password"
                    placeholder="Enter New Password"
                    value={newPassword}
                    onChange={(e) =>
                        setNewPassword(e.target.value)
                    }
                    className="w-full border rounded-lg px-4 py-2 mb-4"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg"
                >

                    Reset Password

                </button>

            </form>

        </div>

    );

};

export default ResetPassword;