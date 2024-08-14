import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import publicRouter from "./routes/publicRoutes.js";
import uploadRouter from "./routes/uploadRoutes.js";
import adminRouter from "./routes/adminRoutes.js";

import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";

dotenv.config();

connectDB();

const PORT = 3000;
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/public", publicRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);

app.use((req, res) => res.status(404).json("Route not found!!"));

mongoose.connection.once("open", () => {
  console.log("connected to DB");
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});
