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

const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(200).json("Product saved..!!");
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).send("User has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
