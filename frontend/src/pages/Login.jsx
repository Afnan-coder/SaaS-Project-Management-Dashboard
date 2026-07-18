import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import Button from "../components/Button";
import Input from "../components/Input";

const Login = () => {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    try {

      setLoading(true);

      await login(formData);

      navigate("/dashboard");

    } catch (error) {

      alert(
        error.response?.data?.message || "Login failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">

      <h1 className="text-3xl font-bold text-center mb-8">
        Login
      </h1>

      <form onSubmit={handleSubmit}>

        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />

        <Input
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />

        <Button
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>

      </form>

      <div className="flex justify-between mt-6 text-sm">

        <Link
          to="/forgot-password"
          className="text-blue-600 hover:underline"
        >
          Forgot Password?
        </Link>

        <Link
          to="/register"
          className="text-blue-600 hover:underline"
        >
          Register
        </Link>

      </div>

    </div>
  );
};

export default Login;