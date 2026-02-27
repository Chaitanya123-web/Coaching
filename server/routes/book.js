import express from "express";
import Book from "../models/book.js";
import { protect } from "../middleware/auth.js";
import { imageUpload } from "../middleware/videoUpload.js"; 

const router = express.Router();

// Public: Fetch all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch inventory" });
  }
});

// Admin: Add new book
router.post("/add", protect, imageUpload.single("image"), async (req, res) => {
  if (req.user.role !== "admin") return res.sendStatus(403);
  
  const { title, price, description, stock } = req.body;
  const image = req.file?.path; 

  const newBook = await Book.create({ title, price, description, stock, image });
  res.json(newBook);
});

// Admin: Delete a book
router.delete("/delete/:id", protect, async (req, res) => {
  if (req.user.role !== "admin") return res.sendStatus(403);
  
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json({ message: "Book removed successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error during deletion" });
  }
});

export default router;