const express = require("express");
const authRouter = require("./routes/auth.route");
const userRouter = require("./routes/user.route");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
module.exports = app;
