import api from "./api";

// Get Dashboard Statistics
export const getDashboard = async () => {
    const response = await api.get("/dashboard");

    return response.data;
};