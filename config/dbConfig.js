import mongoose from "mongoose";
import { config } from "dotenv";
import envFile from "./envConfig.js";
import path from 'path';

// Load environment variables from the appropriate .env file
config({ path: path.resolve(process.cwd(), envFile) }); 

const connectDB = async () => {
    try {
        // eslint-disable-next-line no-undef
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            // Tambahkan opsi timeout di sini (misalnya, 30 detik)
            // serverSelectionTimeoutMS: 30000,
        });

        console.log(`Database connected. ${conn.connection.host}`);
    } catch (error) {
        console.error(error);
    }
};

export default connectDB;