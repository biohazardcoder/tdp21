import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  coins:{ type: Number, default: 0 },
  buyHistory: [],
  loads: [],
  createdLoads : [],
  isVerified: { type: Boolean, default: false },
  savedLoads: [],
  myLoads: [{ type: mongoose.Schema.Types.ObjectId, ref: "Load" }],
}, {timestamps: true});


export default mongoose.models.User || mongoose.model("User", userSchema);
