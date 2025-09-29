const User = require("../models/user.model");
const generateCaption = require("../services/generateCaption.service");
const { uploadFile, deleteFile } = require("../services/imageUpload.service");
const path = require("path");

const getAllUploadedImage = async (req, res) => {
    const userID = req.user.id;
    try {
        const authorizedUserData = await User.findById(userID);
        const uploadedImg = authorizedUserData.uploadedImage;
        res.status(200).json({
            message: "Uploaded images retrieved successfully.",
            images: uploadedImg
        });

    } catch (error) {
        console.error("Error retrieving uploaded images:", error);
        res.status(500).json({
            message: "An error occurred while retrieving uploaded images.",
            error: error.message
        });
    }

}

const uploadImageAndGenerateCaption = async (req, res) => {
    try {
        const userID = req.user.id;
        const authorizedUserData = await User.findById(userID);
        const imageKitResponse = await uploadFile(req.file.buffer, `userImage_${Date.now()}_${path.extname(req.file.originalname)}`);
        const userUploadedImageUrl = imageKitResponse.url;
        const imageKitFileId = imageKitResponse.fileId;
        const { tone, language, additionalInfo } = req.body;

        // generate caption
        const geminiResponse = await generateCaption(req.file, tone, language, additionalInfo);
        const uploadedImageCaption = geminiResponse.text;

        authorizedUserData.uploadedImage.push({
            imageUrl: userUploadedImageUrl,
            caption: uploadedImageCaption,
            fileId: imageKitFileId
        });
        await authorizedUserData.save();
        res.status(200).json({
            message: "Image uploaded and caption generated successfully.",
            imageUrl: userUploadedImageUrl,
            caption: uploadedImageCaption
        });
    } catch (error) {
        console.error("Error uploading image and generating caption:", error);
        res.status(500).json({
            message: "An error occurred while uploading image and generating caption.",
            error: error.message
        });
    }
}

const deleteImage = async (req, res) => {
    try {
        const userId = req.user.id;
        const { imageId } = req.params;

        // Find the user
        const authorizedUserData = await User.findById(userId);

        if (!authorizedUserData) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        // Find the image in the uploadedImage array
        const imageToDelete = authorizedUserData.uploadedImage.find(
            (image) => image._id.toString() === imageId
        );

        if (!imageToDelete) {
            return res.status(404).json({
                message: "Image not found."
            });
        }

        // Delete the image from ImageKit 
        if (imageToDelete.fileId) {
            console.log(`Attempting to delete image from ImageKit with fileId: ${imageToDelete.fileId}`);
            const deleteResult = await deleteFile(imageToDelete.fileId);
            if (deleteResult.success === false) {
                console.error("Failed to delete image from ImageKit:", deleteResult.error);
                console.warn(`Image with fileId ${imageToDelete.fileId} may need manual cleanup from ImageKit`);
            } else {
                console.log(`Successfully deleted image from ImageKit: ${imageToDelete.fileId}`);
            }
        } else {
            console.warn(`No ImageKit fileId found for image ${imageId}. This may be an older image uploaded before fileId tracking was implemented.`);
            console.warn(`Image URL: ${imageToDelete.imageUrl}`);
            console.warn(`Manual cleanup may be required from ImageKit dashboard for this image.`);
        }

        // Find the image index and remove from database
        const imageIndex = authorizedUserData.uploadedImage.findIndex(
            (image) => image._id.toString() === imageId
        );
        authorizedUserData.uploadedImage.splice(imageIndex, 1);

        // Save the updated user data
        await authorizedUserData.save();

        res.status(200).json({
            message: "Image deleted successfully from both database and storage.",
            deletedImageId: imageId
        });

    } catch (error) {
        console.error("Error deleting image:", error);
        res.status(500).json({
            message: "An error occurred while deleting the image.",
            error: error.message
        });
    }
}


module.exports = { getAllUploadedImage, uploadImageAndGenerateCaption, deleteImage };