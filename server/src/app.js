const express = require("express");
const authRouter = require("./routes/auth.route");
const userRouter = require("./routes/user.route");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
module.exports = app;
