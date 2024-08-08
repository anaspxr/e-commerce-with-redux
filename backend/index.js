import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRouter from "./routes/auth.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = 3000;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
