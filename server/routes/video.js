import express from "express";
import { videoUpload } from "../middleware/videoUpload.js";
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
router.post(
  "/add",
  videoUpload.single("video"), // 👈 important
  async (req, res) => {
    try {
      const { title, videourl, course } = req.body;

      if (!title || !course) {
        return res.status(400).json({ message: "title & course required" });
      }

      let finalVideoUrl = videourl;
      let type = "url";


      if (req.file) {
        finalVideoUrl = req.file.path; 
        type = "cloud";
      }

      if (!finalVideoUrl) {
        return res.status(400).json({ message: "video url or file required" });
      }

      if (req.file && videourl) {
        return res.status(400).json({
          message: "Upload either a file OR a URL, not both",
        });
      }

      const video = await Video.create({
        title,
        videourl: finalVideoUrl,
        course,
        type,
      });

      res.json(video);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "server error" });
    }
  }
);

export default router;