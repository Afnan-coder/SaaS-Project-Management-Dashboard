import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import Input from "../components/Input";
import Button from "../components/Button";
import { toast } from "react-toastify";

const Register = () => {
    const navigate = useNavigate();

    const { register } = useAuth();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        role: "developer",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {

            const result = await register(formData);

            if (result.success) {
                toast.success(result.message);
                navigate("/");
            } else {
                toast.error(result.message);
            }

        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }

    };

    return (
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">

            <h1 className="text-3xl font-bold text-center mb-8">
                Register
            </h1>

            <form onSubmit={handleSubmit}>

                <Input
                    label="Username"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter username"
                    required
                />

                <Input
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    required
                />

                <Input
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    required
                />

                <div className="mb-4">
                    <label className="block mb-2 font-medium">
                        Role
                    </label>

                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="developer">Developer</option>
                        <option value="manager">Manager</option>
                        <option value="user">User</option>
                    </select>
                </div>

                <Button
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Registering..." : "Register"}
                </Button>

            </form>

            <p className="text-center mt-6">
                Already have an account?{" "}
                <Link
                    to="/"
                    className="text-blue-600 hover:underline"
                >
                    Login
                </Link>
            </p>

        </div>
    );
};

export default Register;