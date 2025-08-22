const express = require("express");
const authRouter = require("../routes/auth.route");
const app = express();

app.use(express.json());
app.use("/api/auth", authRouter)
module.exports = app;
