import api from "./api";

// Register
export const register = async (userData) => {
    const response = await api.post("/auth/register", userData);
    return response.data;
};

// Login
export const login = async (userData) => {
    const response = await api.post("/auth/login", userData);
    return response.data;
};

// Logout
export const logout = async () => {
    const response = await api.post("/auth/logout");
    return response.data;
};

// Refresh Token
export const refreshToken = async () => {
    const response = await api.get("/auth/refresh");
    return response.data;
};

// Forgot Password
export const forgotPassword = async (email) => {
    const response = await api.post("/auth/forgot-password", {
        email,
    });

    return response.data;
};

// Reset Password
export const resetPassword = async (token, password) => {
    const response = await api.post(`/auth/reset-password/${token}`, {
        password,
    });

    return response.data;
};