import User from "../../schema/userSchema.js";
import bcrypt from "bcryptjs";
import tryCatch from "../../utils/trycatch.js";
import CustomError from "../../utils/CustomError.js";

const getUser = tryCatch(async (req, res) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({ user });
});

const updateUser = tryCatch(async (req, res, next) => {
  if (req.body.isAdmin) next(new CustomError("Invalid field - isAdmin", 400));
  if (req.body.password) {
    const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashedPassword;
  }
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      $set: req.body,
    },
    { new: true }
  );
  if (!updatedUser) next(new CustomError("User not found", 404));
  res.status(200).json(updatedUser);
});

export { getUser, updateUser };
