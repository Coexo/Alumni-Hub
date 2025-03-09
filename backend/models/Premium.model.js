import mongoose from "mongoose";

const premiumUserSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  subscribedAt: { type: Date, default: Date.now }, // Subscription date
});

export default mongoose.model("PremiumUser", premiumUserSchema);
