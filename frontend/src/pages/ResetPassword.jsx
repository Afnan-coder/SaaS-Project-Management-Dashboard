import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { resetPassword } from "../services/resetPasswordService";
import { toast } from "react-toastify";

import Button from "../components/Button";

const ResetPassword = () => {

    const { token } = useParams();

    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true)

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

        } finally {
            setLoading(false)
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

                <Button
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Resetting..." : "Reset Password"}
                </Button>

            </form>

        </div>

    );

};

export default ResetPassword;