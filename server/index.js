import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authroutes from "./routes/auth.js";
import courseroutes from "./routes/course.js";
import videoroutes from "./routes/video.js";
import chatroutes from "./routes/chat.js";

import connectdb from "./db.js";
import createAdmin from "./utils/createadmin.js";
import enrollroutes from "./routes/enroll.js";


dotenv.config();

const app = express();


app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://theindofrenchias.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());

// routes
app.use("/api/auth", authroutes);
app.use("/api/course", courseroutes);
app.use("/api/video", videoroutes);
app.use("/api/chat", chatroutes);
app.use("/api/enroll", enrollroutes);

// root
app.get("/", (req, res) => {
  res.send("backend running successfully");
});

// test
app.get("/api/test", (req, res) => {
  res.json({ message: "api working fine" });
});

// db + admin seed
connectdb().then(createAdmin);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 server running on port ${port}`);
});