import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "academy/videos",        
    resource_type: "video",           
    allowed_formats: ["mp4", "mov", "avi", "mkv", "webm"],
    transformation: [
      { quality: "auto", fetch_format: "auto" }
    ],
  },
});


export const videoUpload = multer({
  storage,
  limits: {
    fileSize: 500 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("video/")) {
      cb(null, true);
    } else {
      cb(new Error("Only video files are allowed"), false);
    }
  },
});