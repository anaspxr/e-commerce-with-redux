import User from "../../schema/userSchema.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../../utils/errorHandler.js";

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateUser = async (req, res) => {
  try {
    if (req.body.isAdmin)
      return res
        .status(400)
        .json({ message: "You are not allowed to do that" });
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
    if (!updatedUser) throw new Error(errorHandler(404, "User not found"));
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export { getUser, updateUser };
