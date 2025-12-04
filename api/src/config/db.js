const mongoose = require('mongoose');
const appConstants = require('../_constants/appConstants');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(appConstants.mongoUri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;

