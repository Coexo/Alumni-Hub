// models/Internship.model.js
import mongoose from 'mongoose';

const InternshipSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    company: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    duration: {
        type: String,
        required: true,
        trim: true
    },
    stipend: {
        type: String,
        required: true,
        trim: true
    },
    workType: {
        type: String,
        enum: ['Remote', 'In-office', 'Hybrid'],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    link: {
        type: String,
        required: true,
        trim: true
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

const Internship = mongoose.model('Internship', InternshipSchema);

export default Internship;