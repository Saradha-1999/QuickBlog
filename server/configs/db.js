import mongoose from "mongoose";

let isConnected = false; // ✅ Track the connection status

const connectDB = async () => {
  if (isConnected) {
    console.log("✅ Already connected to MongoDB.");
    return;
  }

  try {
    console.log("🔌 Connecting to MongoDB...");
    const db = await mongoose.connect(process.env.MONGODB_URI);

    isConnected = db.connections[0].readyState;
    console.log("✅ MongoDB connection established.");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    throw error;
  }
};

export default connectDB;
