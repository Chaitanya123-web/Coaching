import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path"; // Zaroori hai paths ke liye
import { fileURLToPath } from "url"; // ES Modules ke liye

import authroutes from "./routes/auth.js";
import courseroutes from "./routes/course.js";
import videoroutes from "./routes/video.js";
import chatroutes from "./routes/chat.js";

import connectdb from "./db.js";
import createAdmin from "./utils/createadmin.js";
import enrollroutes from "./routes/enroll.js";
import contactroutes from "./routes/contact.js";
import bookRoutes from "./routes/book.js";
import paymentRoutes from "./routes/payment.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://the-indofrench-ias.onrender.com",
      /\.onrender\.app$/ 
    ],
    credentials: true,
  })
);

app.use(express.json());

// API Routes
app.use("/api/payment", paymentRoutes);
app.use("/api/auth", authroutes);
app.use("/api/course", courseroutes);
app.use("/api/video", videoroutes);
app.use("/api/chat", chatroutes);
app.use("/api/enroll", enrollroutes);
app.use("/api/contact", contactroutes);
app.use("/api/books", bookRoutes);
app.use("/api/admin", adminRoutes);

app.use(express.static(path.join(__dirname, "..", "dist")));


app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});

connectdb().then(createAdmin);

const port = process.env.PORT || 5000; 
app.listen(port, () => {
  console.log(`🚀 server running on port ${port}`);
});