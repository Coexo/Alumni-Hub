import mongoose from "mongoose";


const CourseSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  description: { type: String, required: true },
  fees: { type: Number, required: true },
  points: { type: Number, required: true },
  videoLink: { type: String, required: true },
  thumbnail: { type: String, required: true }, // URL of the image
  buyedUsers: [{ type: String }], // Array of user IDs
  createdBy: { type: String, required: true}
});

export default mongoose.model("Course", CourseSchema);
