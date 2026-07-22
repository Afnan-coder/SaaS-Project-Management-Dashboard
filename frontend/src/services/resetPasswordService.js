import api from "./api";

// Reset Password
export const resetPassword = async (token, newPassword) => {

    const response = await api.post(
        "/auth/reset-password",
        {
            token,
            newPassword,
        }
    );

    return response.data;

};