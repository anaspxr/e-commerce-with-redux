import express from "express";
import {
  createUser,
  login,
  logout,
  refreshToken,
} from "../controllers/authController.js";
import tryCatch from "../utils/tryCatch.js";

const router = express.Router();

router.post("/register", tryCatch(createUser));
router.post("/login", tryCatch(login));
router.post("/refreshtoken", tryCatch(refreshToken));
router.post("/logout", tryCatch(logout));

export default router;
