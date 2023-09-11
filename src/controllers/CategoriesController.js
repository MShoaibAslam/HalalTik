const Categories = require("../models/CategoriesModel");
const asyncHandler = require("../middleware/async");

const getCategoriess = asyncHandler(async (req, res, next) => {
  const categoriess = await Categories.find({});

  if (categoriess === "") {
    res.status(404).json({
      status: false,
      message: "categories not found",
    });
  } else {
    res.status(200).json({
      status: true,
      message: "categories found",
      data: categoriess,
    });
  }
});
const createCategories = asyncHandler(async (req, res, next) => {
  const categories = await Categories.create(req.body);
  if (categories) {
    res.status(200).json({
      status: true,
      message: "categories created successfully",
      data: categories,
    });
  } else {
    res.status(404).json({
      status: false,
      message: "internal server error",
    });
  }
});

const getCategories = asyncHandler(async (req, res, next) => {
  const { id: categoriesId } = req.params;
  const categories = await Categories.findOne({ _id: req.params.id });
  if (!categories) {
    res.status(200).json({ status: false, message: "categories not found " });
  } else {
    res
      .status(200)
      .json({ status: true, message: "categories found ", data: categories });
  }
});

const updateCategories = asyncHandler(async (req, res, next) => {
  const categories = await Categories.findOne({ _id: req.params.id });
  if (categories) {
    await Categories.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).then(async (categoriess) => {
      if (categoriess) {
        res.status(200).json({
          status: true,
          message: `categories updated `,
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
      message: `No categories found `,
    });
  }
});

const deleteCategories = asyncHandler(async (req, res, next) => {
  const categories = await Categories.findOne({ _id: req.params.id });
  if (categories) {
    await Categories.findByIdAndDelete(req.params.id).then(async () => {
      res.status(200).json({
        status: true,
        message: `Delete categories `,
      });
    });
  } else {
    res.status(404).json({
      status: false,
      message: `categories not found `,
    });
  }
});
const deleteallCategoriess = asyncHandler(async (req, res, next) => {
  const { id } = req.body;
  const categoriess = await Categories.deleteMany({ _id: { $in: id } });
  if (categoriess) {
    res.status(200).json({
      status: true,
      message: "all categoriess deleted",
    });
  } else {
    res.status(200).json({
      status: false,
      message: "internal server error",
    });
  }
});
module.exports = {
  getCategoriess,
  createCategories,
  getCategories,
  updateCategories,
  deleteCategories,
  deleteallCategoriess,
};
