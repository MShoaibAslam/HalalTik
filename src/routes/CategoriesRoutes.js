/* eslint-disable import/extensions */
const express = require("express");

const CategoriesRouter = express.Router();
const CategoriesController = require("../controllers/CategoriesController");

CategoriesRouter.route("/")
  .get(CategoriesController.getCategoriess)
  .post(CategoriesController.createCategories);
CategoriesRouter.route("/:id")
  .get(CategoriesController.getCategories)
  .patch(CategoriesController.updateCategories)
  .delete(CategoriesController.deleteCategories);
CategoriesRouter.route("/delete/deletall").delete(
  CategoriesController.deleteallCategoriess
);

module.exports = CategoriesRouter;
