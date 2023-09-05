const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema(
  {
    stateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "state",
    },
    cityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cities",
    },
    name: {
      type: String,
      required: [true, "Please provide a name"],
      minlength: [3, "Name cannot be less than 3 characters"],
      unique: true,
    },
    address: {
      type: String,
      default: null,
    },
    pinCode: {
      type: Number,
      required: [true, "Please provide a PIN Code"],
    },
    email: {
      type: String,
      required: [true, "Please provide a email"],
      unique: true,
    },
    website: {
      type: String,
      default: null,
    },
    contactPerson: {
      type: String,
      default: null,
    },
    gstNo: {
      type: String,
      default: null,
    },
    registeredAddress: {
      type: String,
      default: null,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
    },
    helpline: {
      type: Number,
      default: 0,
    },
    logo: {
      type: String,
      default: null,
    },
    description: {
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

const company = mongoose.model("company", CompanySchema);
module.exports = company;
