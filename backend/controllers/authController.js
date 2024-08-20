import User from "../schema/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import CustomError from "../utils/CustomError.js";

const createUser = async (req, res) => {
  const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  const savedUser = await newUser.save();
  res.status(201).json(savedUser);
};

const login = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new CustomError("User does not exist", 404));
  }
  // compare password from body and the hashed password from db
  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) {
    return next(new CustomError("Invalid credentials", 400));
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
};

export { createUser, login };
