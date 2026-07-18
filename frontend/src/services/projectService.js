import api from "./api";

// Get All Projects
export const getProjects = async (params = {}) => {
    const response = await api.get("/projects", {
        params,
    });

    return response.data;
};

// Create Project
export const createProject = async (projectData) => {
    const response = await api.post("/projects", projectData);

    return response.data;
};

// Update Project
export const updateProject = async (id, projectData) => {
    const response = await api.put(
        `/projects/${id}`,
        projectData
    );

    return response.data;
};

// Delete Project
export const deleteProject = async (id) => {
    const response = await api.delete(`/projects/${id}`);

    return response.data;
};

// Get Single Project
export const getProjectById = async (id) => {
    const response = await api.get(`/projects/${id}`);

    return response.data;
};