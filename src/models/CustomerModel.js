const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema(
  {
    mobileNo: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: [true, "Please provide a name"],
      minlength: [3, "Name cannot be less than 3 characters"],
      unique: true,
    },
    email: {
      type: String,
    },
    coupenCode: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    },
  },
  { timestamps: true }
);

const customer = mongoose.model("customer", CustomerSchema);
module.exports = customer;
