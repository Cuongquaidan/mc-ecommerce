const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected successfully");
    } catch (error) {
        console.log(error);
    }
}

module.exports = connect;
