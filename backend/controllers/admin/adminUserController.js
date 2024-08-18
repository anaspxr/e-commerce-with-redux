import User from "../../schema/userSchema.js";
import bcrypt from "bcryptjs";
import tryCatch from "../../utils/trycatch.js";
import CustomError from "../../utils/CustomError.js";

const getAllUsers = tryCatch(async (req, res) => {
  const users = await User.find();
  res.status(200).json({ users });
});

const getUser = tryCatch(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) next(new CustomError("User not found", 404));
  res.status(200).json({ user });
});

const updateUser = tryCatch(async (req, res, next) => {
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
  if (!updatedUser) next(new CustomError("User not found", 404));
  res.status(200).json(updatedUser);
});

const deleteUser = tryCatch(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) next(new CustomError("User not found", 404));
  res.status(200).json({ message: "User has been deleted", user });
});

export { getAllUsers, getUser, deleteUser, updateUser };
