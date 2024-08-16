import WishList from "../../schema/wishListSchema.js";

const getUserWishlist = async (req, res) => {
  try {
    const wishList = await WishList.findOne({ userID: req.user.id });
    if (!wishList) return res.status(404).json("No wishlist found");
    res.status(200).json(wishList);
  } catch (error) {
    res.status(500).json(error);
  }
};

const removeFromWishlist = async (req, res) => {
  try {
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
      { userID: req.user.id },
      { $addToSet: { products: productID } },
      { new: true }
    );

    if (!wishList) {
      wishList = new WishList({
        userID: req.user.id,
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

export { getUserWishlist, removeFromWishlist, addToWishlist };
