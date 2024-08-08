import express from "express";
import User from "../schema/userSchema.js";
import bcrypt from "bcryptjs";

const router = express.Router();

///api/users/register
router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    await newUser.save();
    res.sendStatus(201);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
