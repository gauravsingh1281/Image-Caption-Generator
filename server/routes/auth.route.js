const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/auth.controller");
const { validateCredentials, handleValidationErrors } = require("../middlewares/validator.middleware");

authRouter.post("/register", validateCredentials, handleValidationErrors, authController.register);
authRouter.post("/login", validateCredentials, handleValidationErrors, authController.login);

module.exports = authRouter;

