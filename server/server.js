require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./config/db.config")
const port = process.env.PORT || 3000;

connectDB();
app.listen(port, () => {
    console.log(`Server started listening on port ${port}`)
})