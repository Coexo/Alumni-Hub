import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  mobileNo: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  bio: { type: String },
  gender: { type: String, enum: ["Male", "Female", "Other"] },
  education: [
    {
      name: String,
      startDate: Date,
      endDate: Date,
      isCurrentlyStudying: Boolean,
      degree: String,
      fieldOfStudy: String,
      grade: String,
      collegeId: String, // Image link
      certificates: [
        {
          name: String,
          link: String, // Image link
          status: String,
        },
      ],
    },
  ],
  role: { type: String, enum: ["Alumni", "Student"] },
  projects: [
    {
      name: String,
      description: String,
      techStacks: [String],
      links: [String], // Project Links
    },
  ],
  skills: [
    {
      skillId: mongoose.Schema.Types.ObjectId,
      level: String,
      certificateImage: String, // Image link
    },
  ],
  experience: [
    {
      companyName: String,
      title: String,
      employmentType: String,
      startDate: Date,
      endDate: Date,
      isCurrentlyWorking: Boolean,
      location: String,
      certificateImage: String, // Image link
    },
  ],
  links: [
    {
      name: String,
      link: String, // Social Profile Links 
    },
  ],
}, { timestamps: true });

export default mongoose.model("User", userSchema);

