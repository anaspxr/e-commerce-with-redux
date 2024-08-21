import express from "express";
import { createUser, login, refreshToken } from "../controllers/authController.js";
import tryCatch from "../utils/trycatch.js";

const router = express.Router();

router.post("/register", tryCatch(createUser));
router.post("/login", tryCatch(login));
router.post("/refreshtoken", tryCatch(refreshToken));

export default router;
