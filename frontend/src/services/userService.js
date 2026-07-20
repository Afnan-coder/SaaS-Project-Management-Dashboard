import api from "./api";

// Get All Users
export const getUsers = async () => {

    const response = await api.get("/users");

    return response.data;

};

// Update User Role
export const updateUserRole = async (id, role) => {

    const response = await api.put(
        `/users/${id}/role`,
        { role }
    );

    return response.data;

};