import WishList from "../schema/wishListSchema.js";

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

const removeFromWishlist = async (req, res) => {
  try {
    const wishList = await WishList.findOneAndUpdate(
      { userID: req.params.id },
      {
        $pull: { products: req.body.productID },
      },
      { new: true }
    );
    if (wishList) {
      res.status(200).json(wishList);
    } else {
      res.status(404).json({ message: "Product not found in wishlist" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const addToWishlist = async (req, res) => {
  try {
    const productID = req.body.productID;

    if (!productID) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    let wishList = await WishList.findOneAndUpdate(
      { userID: req.params.id },
      { $addToSet: { products: productID } },
      { new: true }
    );

    if (!wishList) {
      wishList = new WishList({
        userID: req.params.id,
        products: [productID],
      });
      await wishList.save();
      return res.status(201).json(wishList);
    }

    res.status(200).json(wishList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllWishlists, getUserWishlist, removeFromWishlist, addToWishlist };