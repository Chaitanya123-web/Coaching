import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import User from "../models/user.js";
import sendEmail from "../utils/sendemail.js";

const router = express.Router();

/* ================= REGISTER ================= */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const normalizedEmail = email.toLowerCase().trim();

    const existing = await User.findOne({ email: normalizedEmail });

    if (existing) {
      return res.status(400).json({ message: "user already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email: normalizedEmail,
      password: hashed,
      role: "student",
    });

    res.json({ message: "registration successful" });
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
});

/* ================= LOGIN ================= */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
});

/* ================= CURRENT USER ================= */
router.get("/me", async (req, res) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ message: "no token" });

    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ message: "user not found" });

    res.json(user);
  } catch (err) {
    res.status(401).json({ message: "invalid token" });
  }
});


router.post("/forgotpassword", async (req, res) => {
  try {
    const normalizedEmail = req.body.email.toLowerCase().trim();

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const resetToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    const frontendUrl = process.env.FRONTEND_URL || "https://theindofrenchias.netlify.app";
    const resetLink = `${frontendUrl}/resetpassword/${resetToken}`;

    await sendEmail({
      to: user.email,
      subject: "Reset Your Password",
      html: `
        <h2>Password Reset</h2>
        <p>Click below to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>This link expires in 15 minutes.</p>
      `,
    });

    res.json({ message: "reset link sent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "email failed" });
  }
});

router.post("/resetpassword/:token", async (req, res) => {
  try {
    const { password } = req.body;
    const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);

    const hashed = await bcrypt.hash(password, 10);

    await User.findByIdAndUpdate(decoded.id, {
      password: hashed,
    });

    res.json({ message: "password updated successfully" });
  } catch (err) {
    res.status(400).json({ message: "invalid or expired token" });
  }
});



export default router;
