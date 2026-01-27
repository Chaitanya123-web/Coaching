import express from "express";
import Enroll from "../models/enroll.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// check enrollment
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
