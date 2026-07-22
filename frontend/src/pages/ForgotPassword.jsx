import { useState } from "react";
import { forgotPassword } from "../services/forgotPasswordService";

const ForgotPassword = () => {

    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await forgotPassword(email);

            alert(response.message);

        } catch (error) {

            alert(
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

                    Forgot Password

                </h1>

                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border rounded-lg px-4 py-2 mb-4"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg"
                >

                    Send Reset Link

                </button>

            </form>

        </div>

    );

};

export default ForgotPassword;