import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Alumni user ID
    title: { type: String, required: true },
    companyName: { type: String, required: true },
    location: { type: String, required: true },
    experience: { type: String }, // Example: "1-3 years"
    pay: { type: String }, // Example: "₹10,00,000 per annum"
    role: { type: String, required: true }, // Example: "Software Engineer"
    jobDescription: { type: String, required: true },
    skillsRequired: [{ type: String, required: true }], // Example: ["JavaScript", "React", "MongoDB"]
    educationRequired: { type: String, required: true }, // Example: "B.Tech in CS"
    applyLink: { type: String, required: true }, // URL to apply
}, { timestamps: true });

export default mongoose.model("Job", jobSchema);
