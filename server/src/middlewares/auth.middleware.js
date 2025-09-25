const jwt = require("jsonwebtoken");
const authenticatedUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized access: No token provided." });
    try {
        const decodedUserData = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decodedUserData;
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized access: Invalid token.", error: error.message })
    }
}

module.exports = authenticatedUser;