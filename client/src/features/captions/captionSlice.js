import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllImage, uploadImage } from "./captionAPI";

export const getImages = createAsyncThunk(
    "captions/getImages",
    async (_, { rejectWithValue }) => {
        try {
            return await fetchAllImage();
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const uploadImageAndGenerateCaption = createAsyncThunk(
    "captions/uploadImage",
    async (formData, { rejectWithValue }) => {
        try {
            return await uploadImage(formData);
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);
const captionSlice = createSlice({
    name: "captions",
    initialState: {
        images: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch images
            .addCase(getImages.pending, (state) => { state.loading = true; })
            .addCase(getImages.fulfilled, (state, action) => {
                state.loading = false,
                    state.images = action.payload;
            })
            .addCase(getImages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Upload new image + caption
            .addCase(uploadImageAndGenerateCaption.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(uploadImageAndGenerateCaption.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.images.push({
                    imageUrl: action.payload.imageUrl,
                    caption: action.payload.caption,
                });
            })
            .addCase(uploadImageAndGenerateCaption.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    },

});

export const { clearError } = captionSlice.actions;
export default captionSlice.reducer;