import api from "../api/api";


//Get all users 
export const getUsers = async () => {
    const response = await api.get("/users");
    return response.data;
}

// Add User
export const addUser = async (data) => {
    const userWithId = { ...data, userId: "test" };
    const response = await api.post("/users", userWithId);
    return response.data;
}

// delete user
export const deleteUser = async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
}

export const getUser = async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
}

export const updateUser = async (id, data) => {
    const response = await api.put(`/users/${id}`, data);
    return response.data;
}