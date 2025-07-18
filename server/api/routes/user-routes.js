import express from "express";
import { CreateUser, GetAllUsers, GetMe, GetUserById } from "../controllers/user-controller.js";

const router = express.Router();
router.get("/", GetAllUsers)
router.get("/:clerkId", GetUserById)
router.post("/create", CreateUser)
router.post("/me", GetMe)

// router.post("/verify", async (req, res) => {
//   const { clerkId } = req.body;
//   try {
//     const user = await User.findOneAndUpdate(
//       { clerkId },
//       { isVerified: true },
//       { upsert: true, new: true }
//     );
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ message: "Verification failed", error: err });
//   }
// });
// router.post("/status", async (req, res) => {
//   const { clerkId } = req.body;
//   try {
//     const user = await User.findOne({ clerkId });
//     res.json({ isVerified: user?.isVerified || false });
//   } catch (err) {
//     res.status(500).json({ message: "Status fetch failed", error: err });
//   }
// });

export default router;
