import api from "./api";

// Get All Users
export const getUsers = async (params = {}) => {

    const response = await api.get("/users", {
        params,
    });

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

export const deleteUser = async (id) =>{

    const response = await api.delete(
        `users/${id}`
    )

    return response.data

}