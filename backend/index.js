import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routes/userRoutes.js";
import authRouter from "./routes/auth.js";

const PORT = 3000;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

mongoose
  .connect("mongodb://localhost:27017/furniture-shop")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
