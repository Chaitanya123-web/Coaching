import express from "express";
import Course from "../models/course.js";

const router = express.Router();

/* get all courses */
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json({courses});
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
});

/* create course */
router.post("/create", async (req, res) => {
  try {
    const { title, description, price } = req.body;

    if (!title || !description || !price) {
      return res.status(400).json({ message: "all fields required" });
    }

    const courses = await Course.create({
      title,
      description,
      price,
    });

    res.json({courses});
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Batch deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete batch" });
  }
});

export default router;