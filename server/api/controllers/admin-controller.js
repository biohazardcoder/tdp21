import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/admin-model.js";

export const register = async (req, res) => {
  const { firstName, phoneNumber, password } = req.body;
  console.log("Received body:", req.body); 

  try {
    const existingUser = await Admin.findOne({ phoneNumber });
    if (existingUser)
      return res.status(400).json({ message: "Phone number already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new Admin({
      firstName,
      phoneNumber,
      password: hashedPassword,
    });
    await newAdmin.save();

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { phoneNumber, password } = req.body;

  try {
    const admin = await Admin.findOne({ phoneNumber });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });
    
    const token = jwt.sign(
      { _id: admin._id, role: admin.role },
      process.env.JWTSECRET_KEY,
      { expiresIn: "30d" }
    );

    res.json({ token, admin });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

export const getAllAdmins = async (_, res) => {
  try {
    const admins = await Admin.find().select("-password");
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id).select("-password");
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAdmin = async (req, res) => {
  try {
    const updatedAdmin = await Admin.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select("-password");
    res.json(updatedAdmin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAdmin = async (req, res) => {
  try {
    await Admin.findByIdAndDelete(req.params.id);
    res.json({ message: "Admin deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const GetMe = async (req, res) => {
  try {
    const foundAdmin = await Admin.findById(req.userInfo.userId);

    if (!foundAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    return res.status(200).json({ data: foundAdmin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
