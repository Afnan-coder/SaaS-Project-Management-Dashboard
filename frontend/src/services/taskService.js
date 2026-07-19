import api from "./api";

// Get All Tasks
export const getTasks = async (params = {}) => {
    const response = await api.get("/tasks", {
        params,
    });

    return response.data;
};

// Create Task
export const createTask = async (taskData) => {
    const response = await api.post("/tasks", taskData);

    return response.data;
};

// Update Task
export const updateTask = async (id, taskData) => {
    const response = await api.put(
        `/tasks/${id}`,
        taskData
    );

    return response.data;
};

// Delete Task
export const deleteTask = async (id) => {
    const response = await api.delete(`/tasks/${id}`);

    return response.data;
};

// Get Single Task
export const getTaskById = async (id) => {
    const response = await api.get(`/tasks/${id}`);

    return response.data;
};