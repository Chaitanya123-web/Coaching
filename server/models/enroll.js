import mongoose from "mongoose";

const enrollSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
}, { timestamps: true });

export default mongoose.model("Enroll", enrollSchema);