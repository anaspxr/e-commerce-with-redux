import express from "express";
import { createUser, login } from "../controllers/authController.js";

const router = express.Router();

//  url/api/auth/register
router.post("/register", createUser);

//  url/api/auth/login
router.post("/login", login);

export default router;
