import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, logoutUser, registerUser, getCurrentUser } from "./authAPI";
import axiosInstance from "../../services/axiosInstance";

export const register = createAsyncThunk(
    "auth/register",
    async (credentials, { rejectWithValue }) => {
        try {
            return await registerUser(credentials);
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message || "Registration failed");
        }
    }
);

export const login = createAsyncThunk(
    "auth/login",
    async (credentials, { rejectWithValue }) => {
        try {
            return await loginUser(credentials);
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message || "Login failed");
        }
    }
);

export const logout = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            return await logoutUser();
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message || "Logout failed");
        }
    }
);

export const fetchCurrentUser = createAsyncThunk(
    "auth/currentUser",
    async (_, { rejectWithValue }) => {
        try {
            return await getCurrentUser();
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message || "Failed to fetch user");
        }
    }
);

export const uploadImageAndGenerateCaption = createAsyncThunk(
    "auth/uploadImage",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/user/upload-image", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message || "Upload failed");
        }
    }
);

export const getUserImages = createAsyncThunk(
    "auth/getUserImages",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/user/all-uploaded-img");
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message || "Failed to fetch images");
        }
    }
);

export const deleteImage = createAsyncThunk(
    "auth/deleteImage",
    async (imageId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.delete(`/user/delete-image/${imageId}`);
            return { ...response.data, imageId };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message || "Failed to delete image");
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // register
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.error = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // login
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //logout
            .addCase(logout.pending, (state) => {
                state.loading = true;
            })
            .addCase(logout.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.error = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // fetch current user
            .addCase(fetchCurrentUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.error = null;
            })
            .addCase(fetchCurrentUser.rejected, (state) => {
                state.loading = false;
                state.user = null;
            })
            // upload image and generate caption
            .addCase(uploadImageAndGenerateCaption.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(uploadImageAndGenerateCaption.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                // Add the new image to user's uploadedImage array
                if (state.user && action.payload.imageUrl && action.payload.caption) {
                    if (!state.user.uploadedImage) {
                        state.user.uploadedImage = [];
                    }
                    state.user.uploadedImage.push({
                        imageUrl: action.payload.imageUrl,
                        caption: action.payload.caption,
                    });
                }
            })
            .addCase(uploadImageAndGenerateCaption.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // get user images
            .addCase(getUserImages.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserImages.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                // Update user's uploadedImage array
                if (state.user && action.payload.images) {
                    state.user.uploadedImage = action.payload.images;
                }
            })
            .addCase(getUserImages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // delete image
            .addCase(deleteImage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteImage.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                // Remove the deleted image from user's uploadedImage array
                if (state.user && state.user.uploadedImage) {
                    state.user.uploadedImage = state.user.uploadedImage.filter(
                        (image) => image._id !== action.payload.imageId
                    );
                }
            })
            .addCase(deleteImage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;