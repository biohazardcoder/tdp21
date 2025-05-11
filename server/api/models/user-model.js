import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  coins:{ type: Number, default: 0 },
  buyHistory: [],
  loads: [{type:mongoose.Schema.Types.ObjectId, ref:"Load"}],
  createdLoads : [],
  connecting:[
    {
        load: {type:mongoose.Schema.Types.ObjectId, ref:"Load"},
        status: {
            type: String,
        enum: ['Pending', 'Connected', 'Delivered', 'Canceled'],
        default: 'Pending'
      }
          }
    ],
  isVerified: { type: Boolean, default: false },
  myLoads: [{ type: mongoose.Schema.Types.ObjectId, ref: "Load" }],
}, {timestamps: true});


export default mongoose.models.User || mongoose.model("User", userSchema);
