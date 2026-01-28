import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    title: String,
    videourl: String,
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    type: {
      type: String,
      enum: ["url", "cloud"],
      default: "url",
    },
  },
  { timestamps: true }
);


export default mongoose.model("Video", videoschema);
