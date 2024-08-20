import User from "../../schema/userSchema.js";
import bcrypt from "bcryptjs";
import CustomError from "../../utils/CustomError.js";

const getUser = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({ user });
};

const updateUser = async (req, res, next) => {
  if (req.body.isAdmin) return next(new CustomError("Invalid field - isAdmin", 400));
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
  if (!updatedUser) return next(new CustomError("User not found", 404));
  res.status(200).json(updatedUser);
};

export { getUser, updateUser };
