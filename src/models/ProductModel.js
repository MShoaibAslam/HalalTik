const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productPrice: {
      type: Number,
    },
    productDescription: {
      type: String,
    },
    productSize: {
      type: String,
    },
    productCategory: {
      type: String,
      enum: ["Halal", "Haram", "Makrooh"],
      required: [true, "Please add Halal, Haram, Makrooh in this input field"],
    },
    productBarCode: {
      type: String,
    },
  },
  { timestamps: true }
);

const product = mongoose.model("product", ProductSchema);
module.exports = product;
