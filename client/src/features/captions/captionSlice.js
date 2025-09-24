import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllImage, uploadImage } from "./captionAPI";


export const getImages = createAsyncThunk("captions/getImages", fetchAllImage);
export const uploadImageAndGenerateCaption = createAsyncThunk("captions/uploadImage", uploadImage)
const captionSlice = createSlice({
    name: "captions",
    initialState: {
        images: [],
        loading: false,
        error: null,
    },
    reducers: {},
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
                state.error = action.error.message;
            })
            // Upload new image + caption
            .addCase(uploadImageAndGenerateCaption.pending, (state) => {
                state.loading = true;
            })
            .addCase(uploadImageAndGenerateCaption.fulfilled, (state, action) => {
                state.loading = false;
                state.images.push({
                    imageUrl: action.payload.imageUrl,
                    caption: action.payload.caption,
                });
            })
            .addCase(uploadImageAndGenerateCaption.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });

    },

});

export default captionSlice.reducer;