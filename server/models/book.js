import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: String,
  price: Number,
  description: String,
  image: String, 
  stock: Number,
}, { timestamps: true });

export default mongoose.model("Book", bookSchema);