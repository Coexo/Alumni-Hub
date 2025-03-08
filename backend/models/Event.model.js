const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Alumni or Admin who created the event
    title: { type: String, required: true }, // Event name
    description: { type: String, required: true }, // Event details
    date: { type: Date, required: true }, // Event date
    time: { type: String, required: true }, // Event time
    location: { type: String, required: true }, // Venue / Online link
    eventType: { type: String, enum: ["Online", "Offline"], required: true }, // Type of event
    college: { type: String, required: true }, // ✅ College name where the event is happening
    registrationLink: { type: String }, // Optional: Google Form / Registration URL
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Users who registered
    bannerImage: { type: String }, // Image link for the event banner
    createdAt: { type: Date, default: Date.now } // Timestamp
});

export default mongoose.model("Events", eventSchema);

