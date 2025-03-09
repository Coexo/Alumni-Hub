import mongoose from "mongoose";

const InternshipSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    stipend: {
        type: String
    },
    workType: {
        type: String,
        enum: ["Remote", "In-person", "Hybrid"],
        default: "In-person"
    },
    description: {
        type: String
    },
    skills: {
        type: [String],
        default: []
    },
    link: {
        type: String
    },
    postedDate: {
        type: Date,
        default: Date.now
    },
    postedDays: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const Internship = mongoose.model("Internship", InternshipSchema);
export default Internship;