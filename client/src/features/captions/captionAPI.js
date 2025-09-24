import axiosInstance from "../../services/axiosInstance";

const fetchAllImage = async () => {
    const response = await axiosInstance.get("/user/all-uploaded-img");
    return response.data.images;
}

const uploadImage = async (formData) => {
    const response = await axiosInstance.post("/user/upload-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
}

export { fetchAllImage, uploadImage };