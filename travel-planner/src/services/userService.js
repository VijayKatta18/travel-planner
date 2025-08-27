import api from "../api/api";


//Get all trips 
export const getUsers = async () => {
    const response = await api.get("/users");
    return response.data;
}