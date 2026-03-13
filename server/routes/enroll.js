import express from "express";
import Enroll from "../models/enroll.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// GET /api/enroll/my-courses
router.get("/my-courses", protect, async (req, res) => {
  try {
    // Find all enrollments for this user and "populate" the course details
    const enrollments = await Enroll.find({ user: req.user._id }).populate("course");
    
    // Extract only the course objects from the enrollment records
    const myCourses = enrollments
      .filter(enroll => enroll.course !== null) // Safety check
      .map(enroll => enroll.course);

    res.json({ courses: myCourses });
  } catch (err) {
    res.status(500).json({ message: "Error fetching enrolled courses" });
  }
});

router.get("/check/:courseId", protect, async (req, res) => {
  if (req.user.role === "admin") {
    return res.json({ enrolled: true });
  }

  const enroll = await Enroll.findOne({
    user: req.user._id,
    course: req.params.courseId,
  });

  res.json({ enrolled: !!enroll });
});

// enroll after payment
router.post("/add", protect, async (req, res) => {
  const { courseId } = req.body;

  const already = await Enroll.findOne({
    user: req.user._id,
    course: courseId,
  });

  if (already) return res.status(400).json({ message: "Already enrolled" });

  const enroll = await Enroll.create({
    user: req.user._id,
    course: courseId,
  });

  res.json(enroll);
});

export default router;
