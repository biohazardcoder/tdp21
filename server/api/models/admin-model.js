import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "admin" },
  },
  { timestamps: true }
);

export default mongoose.model("Admin", AdminSchema);
