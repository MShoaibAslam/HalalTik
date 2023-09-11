const mongoose = require("mongoose");
// eslint-disable-next-line import/no-extraneous-dependencies
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema(
  {
    profilepic: {
      type: String,
    },
    mobileNo: {
      type: Number,
    },
    username: {
      type: String,
      required: [true, "Please provide a name"],
      minlength: [3, "Name cannot be less than 3 characters"],
      unique: true,
    },
    email: {
      type: String,
    },
    dateOfBirth: {
      type: String,
      default: null,
    },
    password: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["MALE", "FEMALE", "OTHER"],
    },
  },
  { timestamps: true }
);

UserSchema.plugin(passportLocalMongoose);
const user = mongoose.model("user", UserSchema);
module.exports = user;
