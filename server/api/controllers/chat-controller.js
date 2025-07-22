import Chat from "../models/chat-model.js";
import User from "../models/user-model.js";


function generateRandomChatId() {
  return Math.floor(10000000 + Math.random() * 90000000); // 8 xonali random raqam
}

export const GetChatByDriverAndClient = async (req, res) => {
  try {
    const { driver, client } = req.body; 

    if (!driver || !client) {
      return res.status(400).json({ message: "Driver and client ID required" });
    }
    const driverUser = await User.findOne({ clerkId: driver });
    const clientUser = await User.findOne({ clerkId: client });

    if (!driverUser || !clientUser) {
      return res.status(404).json({ message: "User(s) not found" });
    }

    const driverId = driverUser._id;
    const clientId = clientUser._id;

    let chat = await Chat.findOne({
      $or: [
        { driver: driverId, client: clientId },
        { driver: clientId, client: driverId }
      ]
    }).populate("driver").populate("client");

    if (!chat) {
      const chatId = generateRandomChatId();
      chat = new Chat({ chatId, driver: driverId, client: clientId, messages: [] });
      await chat.save();
      chat = await Chat.findById(chat._id).populate("driver").populate("client");
    }

    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: "Problem in get chat by id", error });
  }
};


export const AddMessageToChat = async (req, res) => {
  try {
    const { message, owner, chatId } = req.body;

    if (!message || !owner || !chatId) {
      return res.status(400).json({ message: "message, owner, and chatId are required" });
    }

    const chat = await Chat.findOne({ chatId });

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    chat.messages.push({ message, owner, time: new Date() });
    await chat.save();

    res.status(200).json({ message: "Message added successfully", chat });
  } catch (error) {
    res.status(500).json({ message: "Problem in add message to chat", error });
  }
};


export const DeleteChatByChatId = async (req, res) => {
  try {
    const { chatId } = req.body;

    if (!chatId) {
      return res.status(400).json({ message: "chatId is required" });
    }

    const deleted = await Chat.findOneAndDelete({ chatId });

    if (!deleted) {
      return res.status(404).json({ message: "Chat not found" });
    }

    res.status(200).json({ message: "Chat deleted successfully", deleted });
  } catch (error) {
    res.status(500).json({ message: "Problem in deleting chat", error });
  }
};