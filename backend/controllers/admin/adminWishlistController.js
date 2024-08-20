import WishList from "../../schema/wishListSchema.js";
import CustomError from "../../utils/CustomError.js";

const getAllWishlists = async (req, res) => {
  const wishLists = await WishList.find();
  res.status(200).json(wishLists);
};

const getUserWishlist = async (req, res, next) => {
  const wishList = await WishList.findOne({ userID: req.params.id });
  if (!wishList) return next(new CustomError("Wishlist not found", 404));
  res.status(200).json(wishList);
};

export { getAllWishlists, getUserWishlist };
