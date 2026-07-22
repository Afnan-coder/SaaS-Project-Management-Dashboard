import { useState } from "react";
import { forgotPassword } from "../services/forgotPasswordService";
import { toast } from "react-toastify";
import Button from "../components/Button";

const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true)

        try {

            const response = await forgotPassword(email);

            toast.success(response.message);

        } catch (error) {

            toast.info(
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


                <Button
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Sending Reset Link..." : "Send Reset Link"}
                </Button>

            </form>

        </div>

    );

};

export default ForgotPassword;