const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("hellwo")
})
module.exports = app;
