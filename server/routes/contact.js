import express from "express";
import Contact from "../models/contact.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

/* USER SEND MESSAGE */
router.post("/send", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const saved = await Contact.create({
      name,
      email,
      message,
    });

    res.json({ message: "Message sent successfully", saved });
  } catch (err) {
    res.status(500).json({ message: "Message failed" });
  }
});

/* ADMIN GET ALL MESSAGES */
router.get("/admin", protect, async (req, res) => {
  if (req.user.role !== "admin") return res.sendStatus(403);

  const messages = await Contact.find().sort({ createdAt: -1 });

  res.json(messages);
});

export default router;