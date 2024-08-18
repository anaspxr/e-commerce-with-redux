import express from "express";
import { createUser, login } from "../controllers/authController.js";
import tryCatch from "../utils/trycatch.js";

const router = express.Router();

router.post("/register", tryCatch(createUser));
router.post("/login", tryCatch(login));

export default router;
