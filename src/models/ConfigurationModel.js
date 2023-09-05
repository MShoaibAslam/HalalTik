const mongoose = require("mongoose");

const ConfigurationSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide a email"],
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

const configuration = mongoose.model("configuration", ConfigurationSchema);
module.exports = configuration;
