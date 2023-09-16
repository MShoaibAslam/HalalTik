const Product = require("../models/ProductModel");
const asyncHandler = require("../middleware/async");

const getProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find({});

  if (products === "") {
    res.status(404).json({
      status: false,
      message: "product not found",
    });
  } else {
    res.status(200).json({
      status: true,
      message: "product found",
      data: products,
    });
  }
});
const createProduct = asyncHandler(async (req, res, next) => {
  if (req.body.productCategory) {
    if (
      !(
        req.body.productCategory === "Halal" ||
        req.body.productCategory === "Haram" ||
        req.body.productCategory === "Makrooh"
      )
    ) {
      return res.status(400).json({
        status: false,
        message: "product Category must be Halal, Haram, Makrooh",
      });
    }
  }
  const product = await Product.create(req.body);
  if (product) {
    res.status(200).json({
      status: true,
      message: "product created successfully",
      data: product,
    });
  } else {
    res.status(404).json({
      status: false,
      message: "internal server error",
    });
  }
});

const getProduct = asyncHandler(async (req, res, next) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: req.params.id });
  if (!product) {
    res.status(400).json({ status: false, message: "product not found " });
  } else {
    res
      .status(200)
      .json({ status: true, message: "product found ", data: product });
  }
});
const getProductByBarCode = asyncHandler(async (req, res, next) => {
  const { id: productBarCode } = req.params;
  const product = await Product.findOne({ productBarCode });
  if (!product) {
    res.status(400).json({ status: false, message: "product not found " });
  } else {
    res
      .status(200)
      .json({ status: true, message: "product found ", data: product });
  }
});

const updateProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findOne({ _id: req.params.id });
  if (product) {
    await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).then(async (products) => {
      if (products) {
        res.status(200).json({
          status: true,
          message: `product updated `,
        });
      } else {
        res
          .status(404)
          .json({ status: false, message: `internal server error` });
      }
    });
  } else {
    res.status(404).json({
      status: false,
      message: `No product found `,
    });
  }
});

const deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findOne({ _id: req.params.id });
  if (product) {
    await Product.findByIdAndDelete(req.params.id).then(async () => {
      res.status(200).json({
        status: true,
        message: `Delete product `,
      });
    });
  } else {
    res.status(404).json({
      status: false,
      message: `product not found `,
    });
  }
});
const deleteallProducts = asyncHandler(async (req, res, next) => {
  const { id } = req.body;
  const products = await Product.deleteMany({ _id: { $in: id } });
  if (products) {
    res.status(200).json({
      status: true,
      message: "all products deleted",
    });
  } else {
    res.status(400).json({
      status: false,
      message: "internal server error",
    });
  }
});
module.exports = {
  getProducts,
  createProduct,
  getProduct,
  getProductByBarCode,
  updateProduct,
  deleteProduct,
  deleteallProducts,
};
