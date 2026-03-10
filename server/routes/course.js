import express from "express";
import Course from "../models/course.js";
import { protect } from "../middleware/auth.js";
import { thumbnailUpload } from "../middleware/imageUpload.js"; // Correct import

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json({ courses });
  } catch (err) {
    res.status(500).json({ message: "Server error while fetching courses" });
  }
});

/** * FIX: Changed 'imageUpload.single' to 'thumbnailUpload.single' 
 * to match your import and newly created middleware.
 */
router.post("/create", protect, thumbnailUpload.single("image"), async (req, res) => {
  if (req.user.role !== "admin") return res.sendStatus(403);
  
  try {
    const { title, description, price } = req.body;

    if (!title || !description || !price) {
      return res.status(400).json({ message: "All text fields are required" });
    }

    // Safely extract path from req.file provided by Cloudinary/Multer
    const image = req.file ? req.file.path : null; 

    const course = await Course.create({
      title,
      description,
      price,
      image, // Saves the Cloudinary URL to MongoDB
    });

    res.status(201).json({ course });
  } catch (err) {
    // This logs the actual error message to your VS Code terminal
    console.error("CRITICAL UPLOAD ERROR:", err.message);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

router.delete("/delete/:id", protect, async (req, res) => {
  if (req.user.role !== "admin") return res.sendStatus(403);

  try {
    await Course.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Batch deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete batch" });
  }
});

export default router;