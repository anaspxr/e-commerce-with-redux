import express from "express";
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthZ,
} from "../middlewares/verifyToken.js";
import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

// get all users
router.get("/", verifyTokenAndAdmin, getAllUsers);

//get individual user
router.get("/:id", verifyTokenAndAdmin, getUser);

// update one user
router.put("/:id", verifyTokenAndAuthZ, updateUser);

//  delete one user
router.delete("/:id", verifyTokenAndAdmin, deleteUser);

// todo: get user stats  url/api/users/stats

export default router;
