import express from "express";
import User from "../schema/userSchema.js";

const router = express.Router();

///api/users/register
router.post("/register", (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  newUser
    .save()
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
});

export default router;
