const mongoose = require("mongoose");

const CategoriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      minlength: [3, "Name cannot be less than 3 characters"],
      unique: true,
    },
    url: {
      type: String,
      required: [true, "Please provide a url"],
    },
    count: {
      type: Number,
      default: 0,
      required: [true, "Please provide a count"],
    },
    fetchCount: {
      type: Number,
      required: [true, "Please provide a Fetch Count"],
      default: 0,
    },
    categoryCode: {
      type: String,
      required: [true, "Please provide a Category Code"],
    },
  },
  { timestamps: true }
);

const categories = mongoose.model("categories", CategoriesSchema);
module.exports = categories;
