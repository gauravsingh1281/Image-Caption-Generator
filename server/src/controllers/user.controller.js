const User = require("../models/user.model");
const generateCaption = require("../services/generateCaption.service");
const uploadFile = require("../services/imageUpload.service");
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
        // generate caption
        const geminiResponse = await generateCaption(req.file);
        const uploadedImageCaption = geminiResponse.text;

        authorizedUserData.uploadedImage.push({
            imageUrl: userUploadedImageUrl,
            caption: uploadedImageCaption
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



module.exports = { getAllUploadedImage, uploadImageAndGenerateCaption };