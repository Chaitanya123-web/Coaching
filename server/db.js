import mongoose from "mongoose";

const connectdb = async () => {
  try {
    const uri =
      process.env.USE_CLOUD_DB === "true"
        ? process.env.MONGO_CLOUD
        : process.env.MONGO_LOCAL;

    await mongoose.connect(uri);
    console.log(
      `✅ MongoDB connected → ${
        process.env.USE_CLOUD_DB === "true" ? "CLOUD (Atlas)" : "LOCAL (Compass)"
      }`
    );
  } catch (err) {
    console.error("❌ MongoDB connection failed", err);
    process.exit(1);
  }
};

export default connectdb;