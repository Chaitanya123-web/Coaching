import mongoose from "mongoose";

const videoschema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    videourl: {
      type: String,
      required: true,
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Video", videoschema);
