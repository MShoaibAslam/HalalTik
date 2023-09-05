const mongoose = require("mongoose");

const CitiesSchema = new mongoose.Schema(
  {
    stateId: {
      type: Number,
      required: [true, "Please provide a State Id"],
    },
    name: {
      type: String,
      required: [true, "Please provide a name"],
      minlength: [3, "Name cannot be less than 3 characters"],
      unique: true,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    },
  },
  { timestamps: true }
);

const cities = mongoose.model("cities", CitiesSchema);
module.exports = cities;
