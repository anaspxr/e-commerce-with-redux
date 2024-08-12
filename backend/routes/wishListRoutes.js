import express from "express";
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthZ,
} from "../middlewares/verifyToken.js";
import {
  addToWishlist,
  getAllWishlists,
  getUserWishlist,
  removeFromWishlist,
} from "../controllers/wishlistController.js";

const router = express.Router();

// get wishlist
router.get("/:id", verifyTokenAndAuthZ, getUserWishlist);

router.post("/:id", verifyTokenAndAuthZ, addToWishlist);

router.delete("/:id", verifyTokenAndAuthZ, removeFromWishlist);

//admin - get all wishlist
router.get("/", verifyTokenAndAdmin, getAllWishlists);
export default router;
