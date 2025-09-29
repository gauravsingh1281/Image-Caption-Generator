const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    const { email, password } = req.body;
    try {
        const isUserAlreadyExisted = await User.findOne({ email });
        if (isUserAlreadyExisted) return res.status(409).json({ message: "A user is already registered with this email address." });
        const hashedPassword = await bcrypt.hash(password, 10);
        const createdUser = await User.create({
            email, password: hashedPassword
        })
        const token = jwt.sign({ email: createdUser.email, id: createdUser._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "3d"
        });
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
        });
        res.status(201).json({ message: "User registered successfully.", user: createdUser });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while registering the new user.", error: error.message });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const foundUser = await User.findOne({ email });
        if (!foundUser) return res.status(401).json({ message: "Invalid email or password." });
        const isValidPassword = await bcrypt.compare(password, foundUser.password);
        if (!isValidPassword) return res.status(401).json({ message: "Invalid email or password." })
        const token = jwt.sign({ email: foundUser.email, id: foundUser._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "3d"
        });
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
        });
        res.status(200).json({ message: "User logged in successfully.", user: foundUser })
    } catch (error) {
        res.status(500).json({ message: "An error occurred while logging in the user.", error: error.message });
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });
        res.status(200).json({ message: "User logged out successfully." });

    } catch (error) {
        res.status(500).json({ message: "User failed to logout. Internal server error." });
    }
}

const getCurrentUser = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ message: "User Not authenticated" });
        const decodedUserData = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const authorizedUser = await User.findById(decodedUserData.id).select("-password");

        if (!authorizedUser) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ user: authorizedUser });
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token" })
    }
}
module.exports = { register, login, logout, getCurrentUser };