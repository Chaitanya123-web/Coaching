import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "course_thumbnails",
    allowedFormats: ["jpg", "png", "jpeg", "avif"], 
    resource_type: "image", 
  },
});

export const thumbnailUpload = multer({ storage });