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
    return next(new CustomError("User does not exist", 401));
  }

  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) {
    return next(new CustomError("Invalid credentials", 401));
  }

  // generate access token
  const accessToken = jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SEC,
    { expiresIn: "1h" }
  );

  // generate refresh token
  const refreshToken = jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_REFRESH_SEC,
    { expiresIn: "7d" }
  );

  // store the refresh token in the database
  user.refreshToken = refreshToken;
  await user.save();

  // send refresh token as an HTTP-only cookie for better security
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.SECURE_COOKIE || true, // set to true in production and false in development
    sameSite: "none",
  });

  // Send only necessary user details and the access token
  const userDetails = {
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  };

  res.status(200).json({ user: userDetails, accessToken });
};

const refreshToken = async (req, res, next) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return next(new CustomError("Refresh token not found", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_REFRESH_SEC);

  // check if the token matches the one stored in the database
  const user = await User.findById(decoded.id);
  if (user.refreshToken !== token) {
    return next(new CustomError("Invalid refresh token", 403));
  }

  // Generate a new access token
  const accessToken = jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SEC,
    { expiresIn: "1h" }
  );

  const userDetails = {
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  };

  res.status(200).json({ user: userDetails, accessToken });
};

const logout = async (req, res) => {
  res.clearCookie("refreshToken");
  res.status(200).json({ message: "Logged out successfully" });
};

export { createUser, login, refreshToken, logout };
