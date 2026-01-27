import express from "express";
import Video from "../models/video.js";

const router = express.Router();

/* get single video */
router.get("/single/:videoid", async (req, res) => {
  try {
    const video = await Video.findById(req.params.videoid);
    if (!video) {
      return res.status(404).json({ message: "video not found" });
    }
    res.json(video);
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
});

/* get videos of a course */
router.get("/:courseid", async (req, res) => {
  try {
    const videos = await Video.find({
      course: req.params.courseid,
    }).sort({ createdAt: 1 });

    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
});

/* add video */
router.post("/add", async (req, res) => {
  try {
    const { title, videourl, course } = req.body;

    if (!title || !videourl || !course) {
      return res.status(400).json({ message: "all fields required" });
    }

    const video = await Video.create({
      title,
      videourl,
      course,
    });

    res.json(video);
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
});

export default router;