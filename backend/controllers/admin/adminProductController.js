import Product from "../../schema/productSchema.js";
import CustomError from "../../utils/CustomError.js";

const createProduct = async (req, res) => {
  const newProduct = new Product(req.body);
  const savedProduct = await newProduct.save();
  res.status(200).json({ message: "Product saved successfully", savedProduct });
};

const updateProduct = async (req, res, next) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );
  if (!updatedProduct) return next(new CustomError("Product not found", 404));
  res.status(200).json({ message: "Product updates successfully", updatedProduct });
};

const deleteProduct = async (req, res, next) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  if (!deletedProduct) return next(new CustomError("Product not found", 404));
  res.status(200).send({ message: "Product has been deleted", deletedProduct });
};

export { createProduct, updateProduct, deleteProduct };
