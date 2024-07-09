const mongoose = require( "mongoose");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();
const connectDB = async (req, res) => {
    // const mongoURL = "mongodb://localhost:27017";
    const mongoURL = process.env.MONGO_URI;

    
    const { connection } = await mongoose.connect(mongoURL, { useNewUrlParser: true });

    console.log(`MongoDB Connected to ${connection.host}`);
}

module.exports = connectDB;


