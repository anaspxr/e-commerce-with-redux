import WishList from "../../schema/wishListSchema.js";
import CustomError from "../../utils/CustomError.js";

const getUserWishlist = async (req, res) => {
  const wishList = await WishList.findOne({ userID: req.user.id });
  if (!wishList) return res.status(200).json({ products: [] });
  res.status(200).json(wishList);
};

const getPopulatedUserWishlist = async (req, res) => {
  const wishList = await WishList.findOne({ userID: req.user.id }).populate(
    "products"
  );
  if (!wishList) return res.status(200).json({ products: [] });
  res.status(200).json(wishList);
};

const removeFromWishlist = async (req, res, next) => {
  const wishList = await WishList.findOneAndUpdate(
    { userID: req.user.id },
    {
      $pull: { products: req.body.productID },
    },
    { new: true }
  );
  if (wishList) {
    res.status(200).json(wishList);
  } else {
    return next(new CustomError("Product not found in wishlist", 404));
  }
};

const addToWishlist = async (req, res, next) => {
  const productID = req.body.productID;

  if (!productID) return next(new CustomError("Product ID is required", 400));

  let wishList = await WishList.findOneAndUpdate(
    { userID: req.user.id },
    { $addToSet: { products: productID } },
    { new: true }
  );

  if (!wishList) {
    // if wishlist not found for the user, create a new wishlist
    wishList = new WishList({
      userID: req.user.id,
      products: [productID],
    });
    await wishList.save();
    return res.status(201).json(wishList);
  }

  res.status(200).json(wishList);
};

export {
  getUserWishlist,
  removeFromWishlist,
  addToWishlist,
  getPopulatedUserWishlist,
};
