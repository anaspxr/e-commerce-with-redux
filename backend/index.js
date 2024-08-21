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
import manageErrors from "./middlewares/manageErrors.js";
import CustomError from "./utils/CustomError.js";
import cookieParser from "cookie-parser";

dotenv.config();

connectDB();

const PORT = 3000;
const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/public", publicRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);

app.all("*", (req, res, next) => {
  const err = new CustomError(`Cannot ${req.method} ${req.originalUrl}`, 404);
  next(err);
});

app.use(manageErrors);

mongoose.connection.once("open", () => {
  console.log("connected to DB");
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});
