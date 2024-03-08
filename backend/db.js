import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import colors from "colors";

const MONGO_URI = process.env.mongoUri;

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};
async function connectDB() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(MONGO_URI, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log(
      colors.yellow.underline(
        "Pinged your deployment. You successfully connected to MongoDB!"
      )
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
  }
}

export default connectDB;
