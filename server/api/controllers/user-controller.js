import User from "../models/user-model.js";

export const CreateUser = async (req, res) => {
  const { clerkId } = req.body;

  try {
    const existingUser = await User.findOne({ clerkId });
    if (existingUser) {
      return res.status(200).json(existingUser); 
    }

    const newUser = new User({ clerkId });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "User creation failed", error });
  }
};


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

export const GetMe = async (req, res) => {
  try {
    const { clerkId } = req.params;

    if (!clerkId) {
      return res.status(400).json({ message: "clerkId is required" });
    }

    const user = await User.findOne({ clerkId }).populate("myLoads").populate("loads").populate({
          path: "connecting.load",
        });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};


export const GetAllUsers = async (_, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "User retrieval failed", error: err });
  }
}

