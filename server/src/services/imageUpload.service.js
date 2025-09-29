const ImageKit = require("imagekit");

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_END_POINT
});

const uploadFile = async (file, fileName) => {
    const result = await imagekit.upload({ file, fileName, folder: "Image-Caption-Generator" });
    return result;
}

const deleteFile = async (fileId) => {
    try {
        const result = await imagekit.deleteFile(fileId);
        console.log(`ImageKit file deleted successfully:`, result);
        return result;
    } catch (error) {
        console.error("Error deleting file from ImageKit:", error);
        return { success: false, error: error.message };
    }
}

module.exports = { uploadFile, deleteFile };