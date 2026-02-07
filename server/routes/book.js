import express from "express";
import Book from "../models/book.js";
import { protect } from "../middleware/auth.js";
import { imageUpload } from "../middleware/videoUpload.js"; 

const router = express.Router();

// Public: Get all books
router.get("/", async (req, res) => {
  const books = await Book.find().sort({ createdAt: -1 });
  res.json(books);
});

// Admin: Add new book
router.post("/add", protect, imageUpload.single("image"), async (req, res) => {
  if (req.user.role !== "admin") return res.sendStatus(403);
  
  const { title, price, description, stock } = req.body;
  const image = req.file?.path; // Cloudinary automatically path deta hai

  const newBook = await Book.create({ title, price, description, stock, image });
  res.json(newBook);
});

export default router;