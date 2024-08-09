import express from "express";
import User from "../schema/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

//  url/api/auth/register
router.post("/register", async (req, res) => {
  try {
    const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
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

//  url/api/auth/login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send("User does not exist");
    }

    // compare password from body and the hashed password from db
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid credentials");
    }

    // if password matches, generate a JWT token and send back to the client
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );
    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;
