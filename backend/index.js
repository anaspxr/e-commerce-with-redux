import express from "express";
import cors from "cors";
import productsRouter from "./routes/productRoutes.js";
import mongoose from "mongoose";

const PORT = 3000;
const app = express();
app.use(cors());
app.use(express.json());

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
