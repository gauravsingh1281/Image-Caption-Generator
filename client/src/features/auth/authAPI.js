import axiosInstance from "../../services/axiosInstance";

const registerUser = async (credentials) => {
    const response = await axiosInstance.post("/auth/register", credentials);
    return response.data;
}

const loginUser = async (credentials) => {
    const response = await axiosInstance.post("/auth/login", credentials);
    return response.data;
}

const logoutUser = async () => {
    const response = await axiosInstance.post("/auth/logout");
    return response.data;
}

// for session persistence
const getCurrentUser = async () => {
    const response = await axiosInstance.get("/auth/currentUser");
    return response.data;
}

export { registerUser, loginUser, logoutUser, getCurrentUser }