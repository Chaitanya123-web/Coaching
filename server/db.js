import mongoose from "mongoose";

const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("mongodb connected");
  } catch (err) {
    console.error("mongodb connection failed:", err.message);
    process.exit(1);
  }
};

export default connectdb;