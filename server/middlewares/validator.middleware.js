const { body, validationResult } = require("express-validator");

const validateCredentials = [
    body("email").notEmpty().withMessage("Email is required.").isEmail().withMessage("Please enter a valid email").normalizeEmail(),
    body("password").notEmpty().withMessage("Password is required")
];

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: "Validation failed.",
            errors: errors.array()[0].msg,
        });
    }
    next();
};

module.exports = {
    validateCredentials,
    handleValidationErrors
};