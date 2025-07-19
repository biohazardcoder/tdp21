import User from "../models/user-model.js";
import Load from "../models/load-model.js"
export const CreateUser = async (req, res) => {
  const { clerkId } = req.body;
  try {
    const user = await User.create({clerkId: clerkId})
    res.status(201).json(user);
  }catch (err) {
    console.log(err)
    res.status(500).json({ message: "User creation failed", error: err });
  }}

export const GetUserById = async (req, res) => {
    const { clerkId } = req.params;
    try {
      const user = await User.findOne({ clerkId });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
        res.status(200).json(user);
    }
    catch (err) {
      console.log(err)
      res.status(500).json({ message: "User retrieval failed", error: err });
    }   
}

export const GetMe  = async (req, res) => {
  const { clerkId } = req.body;
  try {
    
    const user = await User.findOne({ clerkId }).populate("myLoads").populate("loads").populate({
          path: "connecting.load",
        });
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
      res.status(200).json(user);
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ message: "User retrieval failed", error: err });
  } 
}

export const GetAllUsers = async (_, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "User retrieval failed", error: err });
  }
}

