const mongoose = require("mongoose");
const connectDb = async () => {
    try {
        const dbConnected = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDb connected at ${dbConnected.connection.host}`)
    } catch (error) {
        console.log(`MongoDB connection failed ${error.message}`);
        process.exit(1);
    }
}