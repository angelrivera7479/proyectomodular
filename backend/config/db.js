import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import colors from "colors";

const MONGO_URI = process.env.mongoUri;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(
      colors.magenta.underline(`MongoDB connected: ${conn.connection.host}`)
    );
  } catch (error) {
    console.log("Error: ", error);
    process.exit();
  }
};

export default connectDB;
