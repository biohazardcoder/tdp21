import mongoose from "mongoose"

const messageSchema = new mongoose.Schema({
  time: { type: Date, default: Date.now },
  message: { type: String },
  owner: { type: String }
});

const ChatSchema = new mongoose.Schema({
  chatId: { type: Number },
  driver: { type: mongoose.Types.ObjectId, ref: "User" },
  client: { type: mongoose.Types.ObjectId, ref: "User" },
  messages: [messageSchema]
});

export default mongoose.model("Chat", ChatSchema)
