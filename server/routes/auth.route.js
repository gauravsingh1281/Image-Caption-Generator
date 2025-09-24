const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/auth.controller");
const { validateCredentials, handleValidationErrors } = require("../middlewares/validator.middleware");
const authenticatedUser = require("../middlewares/auth.middleware");

authRouter.post("/register", validateCredentials, handleValidationErrors, authController.register);
authRouter.post("/login", validateCredentials, handleValidationErrors, authController.login);
authRouter.post("/logout", authenticatedUser, authController.logout);
authRouter.get("/currentUser", authenticatedUser, authController.getCurrentUser)
module.exports = authRouter;

