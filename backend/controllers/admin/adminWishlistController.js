import WishList from "../../schema/wishListSchema.js";
import CustomError from "../../utils/CustomError.js";
import tryCatch from "../../utils/trycatch.js";

const getAllWishlists = tryCatch(async (req, res) => {
  const wishLists = await WishList.find();
  res.status(200).json(wishLists);
});

const getUserWishlist = tryCatch(async (req, res, next) => {
  const wishList = await WishList.findOne({ userID: req.params.id });
  if (!wishList) next(new CustomError("Wishlist not found", 404));
  res.status(200).json(wishList);
});

export { getAllWishlists, getUserWishlist };
