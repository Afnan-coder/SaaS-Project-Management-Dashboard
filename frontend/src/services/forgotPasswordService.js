import api from "./api";

// Forgot Password
export const forgotPassword = async (email) => {

    const response = await api.post("/auth/forgot-password", {
        email,
    });

    return response.data;

};