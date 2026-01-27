import express from "express";
import Chat from "../models/chat.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

/* STUDENT → SEND MESSAGE */
router.post("/send", protect, async (req, res) => {
  try {
    const chat = await Chat.create({
      student: req.user._id,
      sender: "student",
      message: req.body.message,
    });

    res.json(chat);
  } catch {
    res.status(500).json({ message: "send failed" });
  }
});

/* STUDENT → GET OWN CHAT */
router.get("/student", protect, async (req, res) => {
  const chats = await Chat.find({ student: req.user._id }).sort("createdAt");
  res.json(chats);
});

/* ADMIN → LIST STUDENTS */
router.get("/admin/students", protect, async (req, res) => {
  if (req.user.role !== "admin") return res.sendStatus(403);

  const students = await Chat.aggregate([
    { $group: { _id: "$student" } },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },
    {
      $project: {
        _id: 1,
        name: "$user.name",
        email: "$user.email",
      },
    },
  ]);

  res.json(students);
});



/* ADMIN → CHAT WITH ONE STUDENT */
router.get("/admin/:studentId", protect, async (req, res) => {
  if (req.user.role !== "admin") return res.sendStatus(403);

  const chats = await Chat.find({
    student: req.params.studentId,
  }).sort("createdAt");

  res.json(chats);
});

/* ADMIN → REPLY */
router.post("/admin/send/:studentId", protect, async (req, res) => {
  if (req.user.role !== "admin") return res.sendStatus(403);

  const chat = await Chat.create({
    student: req.params.studentId,
    sender: "admin",
    message: req.body.message,
  });

  res.json(chat);
});

export default router;
