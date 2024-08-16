import WishList from "../../schema/wishListSchema.js";

const getAllWishlists = async (req, res) => {
  try {
    const wishLists = await WishList.find();
    res.status(200).json(wishLists);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getUserWishlist = async (req, res) => {
  try {
    const wishList = await WishList.findOne({ userID: req.params.id });
    if (!wishList) return res.status(404).json("No wishlist found");
    res.status(200).json(wishList);
  } catch (error) {
    res.status(500).json(error);
  }
};

export { getAllWishlists, getUserWishlist };
