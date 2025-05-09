import express from "express";
import mongoose from "mongoose";
import userRoutes from "./api/routes/user-routes.js";
import loadRoutes from "./api/routes/load-routes.js";
import adminRoutes from "./api/routes/admin-routes.js";
import contactRoutes from "./api/routes/contact-route.js"
import partnerRoutes from "./api/routes/partner-route.js"

import PaypalServise from "./api/services/paypal-service.js";
import VisaServise from "./api/services/visa-service.js";

import cors from "cors";
import dotenv from "dotenv";
import {clerkClient} from "@clerk/express"

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

//User data.length
app.get("/api/count", async (_, res) => {
  const {totalCount} = await clerkClient.users.getUserList()
  res.status(200).json({ totalCount});
  
});

//Test API
app.get("/", (_, res) => {
  res.send("Server is running 🚀");
});

//Image upload
app.use("/uploads", express.static("uploads"));
app.use("/uploads/images", express.static("uploads/images"));

//Routes
app.use("/api/user", userRoutes);
app.use("/api/load", loadRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/partner", partnerRoutes);

//Payments
app.use("/api/paypal",PaypalServise)
app.use("/api/visa",VisaServise)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} ✅`);
});
mongoose.connect(process.env.MONGO_URI, console.log("MongoDB connected 🚀"));
