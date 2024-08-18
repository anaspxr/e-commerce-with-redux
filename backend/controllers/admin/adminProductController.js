import Product from "../../schema/productSchema.js";
import CustomError from "../../utils/CustomError.js";
import tryCatch from "../../utils/trycatch.js";

const createProduct = tryCatch(async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.status(200).json("Product saved..!!");
});

const updateProduct = tryCatch(async (req, res, next) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );
  if (!updatedProduct) next(new CustomError("Product not found", 404));
  res.status(200).json(updatedProduct);
});

const deleteProduct = tryCatch(async (req, res, next) => {
  const deleted = await Product.findByIdAndDelete(req.params.id);
  if (!deleted) next(new CustomError("Product not found", 404));
  res.status(200).send("Product has been deleted");
});

export { createProduct, updateProduct, deleteProduct };
