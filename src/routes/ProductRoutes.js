/* eslint-disable import/extensions */
const express = require("express");

const ProductRouter = express.Router();
const ProductController = require("../controllers/ProductController");

ProductRouter.route("/")
  .get(ProductController.getProducts)
  .post(ProductController.createProduct);
ProductRouter.route("/:id")
  .get(ProductController.getProduct)
  .patch(ProductController.updateProduct)
  .delete(ProductController.deleteProduct);
ProductRouter.route("/getProductByBarCode/:id").get(
  ProductController.getProductByBarCode
);
ProductRouter.route("/delete/deletall").delete(
  ProductController.deleteallProducts
);

module.exports = ProductRouter;
