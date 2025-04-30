import express from "express";
import mongoose from "mongoose";
import userRoutes from "./api/routes/user-routes.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

app.use("/api/user", userRoutes);
app.get("/", (_, res) => {
  res.send("Server is running");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} `);
});
