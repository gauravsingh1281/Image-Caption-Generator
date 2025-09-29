const express = require("express");
const multer = require('multer');
const userRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const userController = require("../controllers/user.controller")
const authenticatedUser = require("../middlewares/auth.middleware")


userRouter.get("/all-uploaded-img", authenticatedUser, userController.getAllUploadedImage);
userRouter.post("/upload-image", authenticatedUser, upload.single("imageFile"), userController.uploadImageAndGenerateCaption);
userRouter.delete("/delete-image/:imageId", authenticatedUser, userController.deleteImage);

module.exports = userRouter;