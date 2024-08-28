import User from "../../schema/userSchema.js";
import Order from "../../schema/orderSchema.js";
import Product from "../../schema/productSchema.js";
import CustomError from "../../utils/CustomError.js";

// count total number of users, products and ``orders
const getCount = async (req, res) => {
  const users = await User.countDocuments();
  const products = await Product.countDocuments();
  const orders = await Order.countDocuments();

  res.status(200).json({ users, products, orders });
};

// user stats
const getMonthlyUsers = async (req, res, next) => {
  const year = req.query.year || new Date().getFullYear();
  const stats = await User.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $project: {
        month: { $month: "$createdAt" },
      },
    },
    {
      $group: {
        _id: "$month",
        count: { $sum: 1 },
      },
    },
  ]);
  if (!stats) return next(new CustomError("No data found", 404));
  res.status(200).json({ year, stats });
};

// revenue stats
const getMonthlyRevenue = async (req, res, next) => {
  const year = req.query.year || new Date().getFullYear();
  const stats = await Order.aggregate([
    {
      $match: {
        purchaseDate: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
        status: { $ne: "cancelled" },
      },
    },
    {
      $project: {
        month: { $month: "$purchaseDate" },
        sales: "$amount",
      },
    },
    {
      $group: {
        _id: "$month",
        revenue: { $sum: "$sales" },
      },
    },
  ]);
  if (!stats) return next(new CustomError("No data found", 404));
  res.status(200).json({ year, stats });
};

const getYearlyRevenue = async (req, res, next) => {
  const stats = await Order.aggregate([
    { $match: { status: { $ne: "cancelled" } } },
    {
      $project: {
        year: { $year: "$purchaseDate" },
        sales: "$amount",
      },
    },
    {
      $group: {
        _id: "$year",
        revenue: { $sum: "$sales" },
      },
    },
  ]);
  if (!stats) return next(new CustomError("No data found", 404));
  res.status(200).json({ stats });
};

const getTotalRevenue = async (req, res, next) => {
  const stats = await Order.aggregate([
    { $match: { status: { $ne: "cancelled" } } },
    {
      $group: {
        _id: null,
        revenue: { $sum: "$amount" },
      },
    },
  ]);
  if (!stats) return next(new CustomError("No data found", 404));
  const totalRevenue = stats[0].revenue;
  res.status(200).json({ stats: { totalRevenue } });
};

const getMostSold = async (req, res, next) => {
  const stats = await Order.aggregate([
    {
      $unwind: "$products",
    },
    {
      $group: {
        _id: "$products.productID",
        total: { $sum: "$products.quantity" },
      },
    },
    {
      $sort: { total: -1 },
    },
    {
      $limit: 5,
    },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "_id",
        as: "productDetails",
      },
    },
    {
      $unwind: "$productDetails", // Unwind to get a single product object instead of an array
    },
    {
      $project: {
        _id: 1,
        total: 1,
        "productDetails.name": 1,
      },
    },
  ]);
  if (!stats) return next(new CustomError("No data found", 404));
  res.status(200).json({ stats });
};

export {
  getCount,
  getMonthlyUsers,
  getMonthlyRevenue,
  getYearlyRevenue,
  getTotalRevenue,
  getMostSold,
};
