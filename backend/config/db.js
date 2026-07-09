
/*
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(error);   // <-- This is the only important change
        process.exit(1);
    }
};

module.exports = connectDB;

*/


const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        console.log("URI Loaded:", process.env.MONGO_URI);

        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Connected:", conn.connection.host);

    } catch (error) {

        console.error("Mongo Error:");
        console.error(error);

        process.exit(1);
    }
};

module.exports = connectDB;

