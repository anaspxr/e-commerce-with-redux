import Product from "../schema/productSchema.js";

const getProducts = async (req, res) => {
  try {
    const queryNew = req.query.new;
    const queryCategory = req.query.category;
    let products;
    if (queryNew) {
      if (queryCategory)
        products = await Product.find({ category: { $in: [queryCategory] } })
          .sort({ createdAt: -1 })
          .limit(5);
      else products = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (queryCategory) {
      products = await Product.find({ category: { $in: [queryCategory] } });
    } else {
      products = await Product.find();
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json(error);
  }
};

export { getProducts, getProductById };
