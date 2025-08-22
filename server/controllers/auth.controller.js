const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
    const { email, password } = req.body;
    try {
        const isUserAlreadyExisted = await User.findOne({ email });
        if (isUserAlreadyExisted) return res.status(409).json({ message: "User already registered with this email" });
        const hashedPassword = await bcrypt.hash(password, 10);
        const createdUser = await User.create({
            email, password: hashedPassword
        })
        const token = jwt.sign({ email: createdUser.email, id: createdUser._id }, process.env.JWT_SECRET_KEY);
        res.cookie("token", token);
        res.status(201).json({ message: "User registered successfully", user: createdUser });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong while registering new user", error: error.message });
    }
}


module.exports = { register };