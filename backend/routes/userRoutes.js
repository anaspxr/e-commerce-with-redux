import express from "express";
import { verifyTokenAndAuthZ } from "../middlewares/verifyToken.js";
import bcrypt from "bcryptjs";
import User from "../schema/userSchema.js";

const router = express.Router();

router.put("/:id", verifyTokenAndAuthZ, async (req, res) => {
  try {
    if (req.body.password) {
      const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
      req.body.password = hashedPassword;
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;
