import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: String,
  price: Number,
  description: String,
  image: String, // Cloudinary URL store hoga
  stock: Number,
}, { timestamps: true });

export default mongoose.model("Book", bookSchema);